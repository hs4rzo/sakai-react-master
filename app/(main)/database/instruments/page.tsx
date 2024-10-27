'use client'
import { LayoutContext } from '@/layout/context/layoutcontext';
import { LayoutConfig } from '@/types';
import { IInstrument, defaultInstrument } from '@/types/instrument';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { useContext, useEffect, useState } from 'react';

import { getInstruments } from './action';

const items: MenuItem[] = [{ label: 'Database' }, { label: 'รายชื่ออุปกรณ์' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }


const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
];

function LabsPage() {
  const { setLayoutConfig, layoutConfig } = useContext(LayoutContext);
  const [data, setData] = useState<IInstrument[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<IInstrument>(defaultInstrument);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>('new');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


  useEffect(() => {
    setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ripple: true }));
    setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
    get_instrument_data();
  }, []);

  const get_instrument_data = async () => {
    try {
      setLoading(true);
      const items = await getInstruments();
      setData(items)
      setLoading(false);
    } catch (err) {
      console.error("Error fetching labs:", err);
      throw new Error("Failed to fetch labs.");
    }

  }


  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    (_filters['global'] as any).value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };


  const clear_filter = () => {
    setGlobalFilterValue('');
    setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
  };


  
  const action_display = (item: IInstrument) => {
    return (
      <div style={{ width: '100%' }} className='flex justify-content-between'>
        <Button icon='fa-solid fa-pencil'  onClick={e => edit_handle(item)} title='คลิก เพื่อแก้ไขข้อมูล' rounded />
        <Button icon='fa-solid fa-trash' severity="danger" title='คลิก เพื่อลบรายการ'rounded/>
      </div>
    )
  }


  const header_display = () => {
    return (
      <div className="flex justify-content-between">
        <div className='flex justify-content-start' style={{ width: '50%' }}>
          <Button icon="pi pi-plus" label="เพิ่มรายการ" onClick={new_handle} text className='mr-3' />
          <Button icon="pi pi-filter-slash" severity="secondary" text label="ล้างฟิลเตอร์" onClick={clear_filter} />
        </div>

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };


  const new_handle = () => { }

  const edit_handle = (item: IInstrument) => { }


  return (
    <>
      <BreadCrumb model={items} home={home} />
      <div className='grid'>

        <div className='col-12 md:col-12 mt-2'>
          <div className="card ">

            <DataTable
              loading={loading}
              value={data}
              filters={filters}
              globalFilterFields={['inst_id', 'inst_name']}
              stripedRows
              header={header_display}
              paginator rows={15}
              tableStyle={{ width: '100%' }}>
              <Column field='inst_id' header="Id" ></Column>
              <Column field='inst_name' header="Lab Name" style={{ width: '83%' }} ></Column>
              <Column body={action_display} header="เลือก" style={{ width: '100px' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default LabsPage;