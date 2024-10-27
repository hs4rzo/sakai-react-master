'use client'
import { LayoutContext } from '@/layout/context/layoutcontext';
import { LayoutConfig } from '@/types';
import { ITruck, defaultCustomer, defaultTruck } from '@/types/customer';
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

const items: MenuItem[] = [{ label: 'Database' }, { label: 'ข้อมูลรถบรรทุกขนส่งเอทานอล' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }



const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
];

function LabsPage() {
  const { setLayoutConfig, layoutConfig } = useContext(LayoutContext);
  const [data, setData] = useState<TextTrack[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<TextTrack>(defaultTruck);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>('new');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


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

const edit_handle = (item: TextTrack) => { }

const toolbarRightTemplate = <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />;// <SplitButton label="Options" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>;

// ใช้ฟังก์ชันนี้ใน useEffect
useEffect(() => {

  setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  get_instrument_data(); // เรียกใช้ฟังก์ชันนี้แทน
}, []);


const get_instrument_data = async () => {
  try {
    setLoading(true);
    const response = await fetch('/car.json');
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

const action_display = (item: TextTrack) => {
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
    filters={filters}globalFilterFields={[
    'vehicle_id', 
    'license_plate', 
    'capacity_liters', 
    'current_location.latitude', 
    'current_location.longitude', 
    'status', 
    'fuel_type', 
    'driver.name', 
    'driver.contact_phone', 
    'ethanol_transport_history'
  ]} // ปรับชื่อฟิลด์ให้ตรง
  stripedRows

  paginator
  rows={15}>
  <Column body={action_display} header="เลือก" style={{ minWidth: '100px' }} />
  <Column field='vehicle_id' header="รหัสรถบรรทุก" style={{ minWidth: '200px' }} />
  <Column field='vehicle_type' header="ประเภท" style={{ minWidth: '200px' }} />
  <Column field='license_plate' header="หมายเลขทะเบียน" style={{ minWidth: '200px' }} />
  <Column field='capacity_liters' header="ความจุ (ลิตร)" style={{ minWidth: '200px' }} />
  <Column field='current_location.latitude' header="ละติจูด" style={{ minWidth: '200px' }} />
  <Column field='current_location.longitude' header="ลองจิจูด" style={{ minWidth: '200px' }} />
  <Column field='status' header="สถานะ" style={{ minWidth: '200px' }} />
  <Column field='last_service_date' header="วันที่บริการล่าสุด" style={{ minWidth: '200px' }} />
  <Column field='fuel_type' header="ประเภทเชื้อเพลิง" style={{ minWidth: '200px' }} />
  <Column field='driver.name' header="ชื่อคนขับ" style={{ minWidth: '200px' }} />
  <Column field='driver.contact_phone' header="โทรศัพท์ติดต่อ" style={{ minWidth: '200px' }} />
</DataTable>


          </div>
        </div>
      </div>
    </>
  )
}

export default LabsPage;