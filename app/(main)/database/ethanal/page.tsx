'use client'
import { LayoutContext } from '@/layout/context/layoutcontext';
import { LayoutConfig } from '@/types';
import { IEthanol, defaultCustomer, defaultEthanol, defaultTaxRate } from '@/types/customer';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

import { Toolbar } from 'primereact/toolbar';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import React, { useContext, useEffect, useState } from 'react';
//import { getCustomer } from './action';

const items: MenuItem[] = [{ label: 'Database' }, { label: 'ชนิดเอทานอล' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }



const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
];

function LabsPage() {
  const { setLayoutConfig, layoutConfig } = useContext(LayoutContext);
  const [data, setData] = useState<IEthanol[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<IEthanol>(defaultEthanol);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>('new');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


// ใช้ฟังก์ชันนี้ใน useEffect
useEffect(() => {
  setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ripple: true }));
  get_instrument_data();
}, []);

const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  let _filters = { ...filters };
  (_filters['global'] as any).value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};




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



const toolbarLeftTemplate = () => (
  <>
    <Button label="เพิ่มรายการใหม่" icon="pi pi-plus" style={{ marginRight: '.5em' }} onClick={new_handle} />
    <Button label="นำเข้า" icon="pi pi-folder-open" severity="secondary" />
    <i className="pi pi-bars p-toolbar-separator" style={{ marginRight: '.5em' }}></i>
    <Button icon="pi pi-print" severity="danger" />
  </>
);


const new_handle = () => { }



const deleteItem = async (type) => {
 
};

const edit_handle = (item: IEthanol) => { }

const toolbarRightTemplate = <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />;// <SplitButton label="Options" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>;

// ใช้ฟังก์ชันนี้ใน useEffect
useEffect(() => {

  setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  get_instrument_data(); // เรียกใช้ฟังก์ชันนี้แทน
}, []);


const get_instrument_data = async () => {
  try {
    setLoading(true);
    const response = await fetch('/type.json');
    const items = await response.json();
    console.log(items); // ตรวจสอบข้อมูล
    setData(items);
    setLoading(false);
  } catch (err) {
    console.error("Error fetching labs:", err);
    throw new Error("Failed to fetch labs.");
  }
};


const clear_filter = () => {
  setGlobalFilterValue('');
  setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
};

const action_display = (item: IEthanol) => {
  return (
    <div style={{ width: '100%' }} className='flex justify-content-between'>
      <Button icon="pi pi-check" severity="success" style={{ marginRight: '.5em' }} title='คลิก เพื่อแก้ไขข้อมูล' onClick={e => edit_handle(item)} />
      <Button
        icon="pi pi-trash"
        severity="warning"
        style={{ marginRight: '.5em' }}
        title='คลิก เพื่อลบรายการ'
        onClick={async () => {
          const confirmDelete = window.confirm("คุณแน่ใจว่าต้องการลบรายการนี้?");
          if (confirmDelete) {
            await deleteItem(item.type); // ตรวจสอบว่ามี item.atg_id
          }
        }}
      />
    </div>
  )
}

  
  return (
    <>
      
     <BreadCrumb model={items} home={home} />
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <Toolbar start={toolbarLeftTemplate} end={toolbarRightTemplate}></Toolbar>
          </div>
        </div>

        <div className='col-12 md:col-12 mt-2'>
          <div className="card " style={{overflowX: 'auto'}}>
          <DataTable
            loading={loading}
            value={data}
            scrollable
            filters={filters}
            globalFilterFields={['ingredient', 'use', 'description']} // กำหนดฟิลด์สำหรับการค้นหา
            stripedRows
            header="ชนิดเอทานอล"
            paginator
            rows={15}
        >
             <Column body={action_display} header="เลือก" style={{ minWidth: '100px' }} />
            <Column field="type" header="ประเภท" />
            <Column field="ingredient" header="ส่วนผสม" />
            <Column field="use" header="การใช้งาน (%)" />           
        </DataTable>

          </div>
        </div>
      </div>
    </>
  )
}

export default LabsPage;