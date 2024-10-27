'use client'
import { LayoutContext } from '@/layout/context/layoutcontext';
import { LayoutConfig } from '@/types';
import { ILab, defaultLab } from '@/types/lab';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { useContext, useEffect, useState } from 'react';

import { getLabs } from './action';

const items: MenuItem[] = [{ label: 'Database' }, { label: 'ข้อมูลห้อง Labs' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }


const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
];

function LabsPage() {
  const { setLayoutConfig, layoutConfig } = useContext(LayoutContext);
  const [data, setData] = useState<ILab[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<ILab>(defaultLab);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>('new');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


  useEffect(() => {
    setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ripple: true }));
    setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
    get_labs_data();
  }, []);

  const get_labs_data = async () => {
    try {
      setLoading(true);
      const items = await getLabs();
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


  
  const action_display = (item: ILab) => {
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

  const edit_handle = (item: ILab) => { }


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
              globalFilterFields={['lab_id', 'lab_name', 'lab_code']}
              stripedRows
              header={header_display}
              paginator rows={15}
              tableStyle={{ maxWidth: '100%' }}>
              <Column field='lab_id' header="Id" style={{ maxWidth: '5%' }}></Column>
              <Column field='lab_name' header="Lab Name" style={{ maxWidth: '20%' }} ></Column>
              <Column field='lab_code' header="Lab Code" style={{ maxWidth: '15%' }}></Column>
              <Column field='lab_comment' header="Remark" style={{ maxWidth: '45%' }}></Column>
              <Column body={action_display} header="เลือก" style={{ width: '100px' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default LabsPage;