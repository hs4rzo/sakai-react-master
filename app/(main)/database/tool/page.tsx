'use client'
import { LayoutContext } from '@/layout/context/layoutcontext';
import { LayoutConfig } from '@/types';
import { IFlowMeter, defaultCustomer, defaultEthanol, defaultFlowMeter } from '@/types/customer';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import React, { useContext, useEffect, useState } from 'react';
//import { getCustomer } from './action';

const items: MenuItem[] = [{ label: 'Database' }, { label: 'ข้อมูลเครื่องมือวัดอัตราการไหล' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }

const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
];

function LabsPage() {
  const { setLayoutConfig, layoutConfig } = useContext(LayoutContext);
  const [data, setData] = useState<IFlowMeter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<IFlowMeter>(defaultFlowMeter);
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

const get_instrument_data = async () => {
  try {
    setLoading(true);
    const response = await fetch('/tool.json');
    const items = await response.json();
    console.log(items); // ตรวจสอบข้อมูลที่ถูกโหลด
    if (Array.isArray(items)) {
      setData(items); // เซ็ตข้อมูลเฉพาะเมื่อข้อมูลเป็นอาร์เรย์
    }
    setLoading(false);
  } catch (err) {
    console.error("Error fetching labs:", err);
    setLoading(false); // ปิด loading ถ้ามีข้อผิดพลาด
  }
};



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


  

  const action_display = (item: IAutomaticTankGauge) => {
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
              await deleteItem(item.atg_id); // ตรวจสอบว่ามี item.atg_id
            }
          }}
        />
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

  const edit_handle = (item: IFlowMeter) => { }

  const toolbarRightTemplate = <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />;// <SplitButton label="Options" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>;

  const toolbarItems = [
    {
      label: 'Save',
      icon: 'pi pi-check'
    },
    {
      label: 'Update',
      icon: 'pi pi-sync'
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash'
    },
    {
      label: 'Home Page',
      icon: 'pi pi-home'
    }
  ];


  const toolbarLeftTemplate = () => (
    <>
      <Button label="เพิ่มรายการใหม่" icon="pi pi-plus" style={{ marginRight: '.5em' }} onClick={new_handle} />
      <Button label="นำเข้า" icon="pi pi-folder-open" severity="secondary" />
      <i className="pi pi-bars p-toolbar-separator" style={{ marginRight: '.5em' }}></i>
      <Button icon="pi pi-print" severity="danger" />
    </>
  );

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
  globalFilterFields={['flow_meter_id', 'meter_type', 'manufacturer', 'model', 'measurement_range', 'accuracy', 'installation_date', 'last_calibration_date', 'next_calibration_due', 'status', 'description']}

  stripedRows
  header="ข้อมูลเครื่องมือวัดอัตราการไหล"
  paginator
  rows={15}>
<Column body={action_display} header="เลือก" style={{ minWidth: '100px' }} />
  <Column field='flow_meter_id' header="รหัสมาตรวัด" style={{ minWidth: '200px' }} />
<Column field='meter_type' header="ชนิดของมาตรวัด" style={{ minWidth: '200px' }} />
<Column field='manufacturer' header="ผู้ผลิต" style={{ minWidth: '200px' }} />
<Column field='model' header="รุ่น" style={{ minWidth: '200px' }} />
<Column field='measurement_range' header="ช่วงการวัด" style={{ minWidth: '200px' }} />
<Column field='accuracy' header="ความแม่นยำ" style={{ minWidth: '200px' }} />
<Column field='installation_date' header="วันที่ติดตั้ง" style={{ minWidth: '200px' }} />
<Column field='last_calibration_date' header="วันที่สอบเทียบล่าสุด" style={{ minWidth: '200px' }} />
<Column field='next_calibration_due' header="วันที่สอบเทียบถัดไป" style={{ minWidth: '200px' }} />
<Column field='status' header="สถานะ" style={{ minWidth: '200px' }} />
<Column field='description' header="รายละเอียด" style={{ minWidth: '200px' }} />

</DataTable>

          </div>
        </div>
      </div>
    </>
  )
}

export default LabsPage;