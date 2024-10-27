//npm run dev
//node server.js
'use client'
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

import { Calendar } from "primereact/calendar";
import { LayoutContext } from '@/layout/context/layoutcontext';
import { IAutomaticTankGauge, defaultAutomaticTankGauge, defaultCustomer } from '@/types/customer';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import React, { useRef, useContext, useEffect, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Toolbar } from 'primereact/toolbar';
import { SplitButton } from 'primereact/splitbutton';
import { InputTextarea } from 'primereact/inputtextarea';
const items: MenuItem[] = [{ label: 'Database' }, { label: 'ข้อมูลผู้ผลิตและจำหน่ายเอทานอล' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }
const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
];

const LabsPage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [newItematg_id, setnewItematg_id] = useState('');
  const [newItemmodel, setnewItemmodel] = useState('');
  const [newItemmanufacturer, setnewItemmanufacturer] = useState('');
  const [newIteminstallation_date, setnewIteminstallation_date] = useState('');
  const [newItemlast_calibration_date, setnewItemlast_calibration_date] = useState<any>(null);
  const [newItemnext_calibration_due, setnewItemnext_calibration_due] = useState<any>(null);
  const [newItemtank_capacity, setnewItemtank_capacity] = useState('');
  const [newItemcurrent_level, setnewItemcurrent_level] = useState('');
  const [newItemstatus, setnewItemstatus] = useState('');
  const [newItemdescription, setnewItemdescription] = useState('');



  const new_handle = () => {
    setFormVisible(true);
    setnewItematg_id('');
    setnewItemmodel('');
    setnewItemmanufacturer('');
    setnewIteminstallation_date('');
    setnewItemlast_calibration_date('');
    setnewItemnext_calibration_due('');
    setnewItemtank_capacity('');
    setnewItemcurrent_level('');
    setnewItemstatus('');
    setnewItemdescription('');
  };


  const deleteItem = async (atg_id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/atg/delete?atg_id=${atg_id}`, {
        method: "GET", // ใช้ GET แทน DELETE สำหรับการทดสอบ
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        get_instrument_data();
        console.log(result.message);
      } else {
        alert("Failed to delete item");
        console.error("Failed to delete item");
      }
    } catch (error) {
      alert('Error');
      console.error("Error:", error);
    }
  };


  const saveNewItem = async () => {
    const newItem = {
      atg_id: newItematg_id,
      model: newItemmodel,
      manufacturer: newItemmanufacturer,
      installation_date: newIteminstallation_date,
      last_calibration_date: newItemlast_calibration_date,
      next_calibration_due: newItemnext_calibration_due,
      tank_capacity: newItemtank_capacity,
      current_level: newItemcurrent_level,
      status: newItemstatus,
      description: newItemdescription



    };
    //const response = await fetch(`http://localhost:3001/api/items/add?atg_id=${newItem.atg_id}&model=${encodeURIComponent(newItem.model)}&manufacturer=${encodeURIComponent(newItem.manufacturer)}&installation_date=${newItem.installation_date}&last_calibration_date=${newItem.last_calibration_date}`, {
    try {
      const response = await fetch(`http://localhost:3001/api/atg/add?atg_id=${newItem.atg_id}&model=${encodeURIComponent(newItem.model)}&manufacturer=${encodeURIComponent(newItem.manufacturer)}&installation_date=${newItem.installation_date}&last_calibration_date=${newItem.last_calibration_date}&next_calibration_due=${newItem.next_calibration_due}&tank_capacity=${newItem.tank_capacity}&current_level=${newItem.current_level}&status=${newItem.status}&description=${newItem.description}`, {
        method: "GET", // ใช้ GET แทน POST
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("New item added:", result);
        setFormVisible(false);
        get_instrument_data();
      } else {
        alert("Failed to add item");
        console.error("Failed to add item");
      }
    } catch (error) {
      alert('Error');
      console.error("Error:", error);
    }
  };


  const menu1 = useRef<Menu>(null);
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


  const [data, setData] = useState<IAutomaticTankGauge[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<IAutomaticTankGauge>(defaultAutomaticTankGauge);
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

  const toolbarRightTemplate = <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />;// <SplitButton label="Options" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>;

  // ใช้ฟังก์ชันนี้ใน useEffect
  useEffect(() => {

    setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
    get_instrument_data(); // เรียกใช้ฟังก์ชันนี้แทน
  }, []);


  const get_instrument_data = async () => {
    try {
      setLoading(true);
      const response = await fetch('/atg.json');
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

  const edit_handle = (item: IAutomaticTankGauge) => { }
  return (
    <>
      <BreadCrumb model={items} home={home} />
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <Toolbar start={toolbarLeftTemplate} end={toolbarRightTemplate}></Toolbar>
          </div>
        </div>

        <div className="col-12 md:col-12 mt-2">
          <div className="card" style={{ overflowX: 'auto' }}>
            <DataTable
              loading={loading}
              value={data} // ใช้ data ที่เซ็ตไว้
              scrollable
              filters={filters}
              globalFilterFields={['model', 'manufacturer', 'status']} // เปลี่ยนตาม field ที่ต้องการค้นหา
              stripedRows
              header="เครื่องมือวัดระดับการจัดเก็บเอทานอล (ATG)"
              paginator
              rows={15}
            >
              <Column body={action_display} header="เลือก" style={{ minWidth: '100px' }} />
              <Column field='atg_id' header="รหัสเครื่องมือวัดระดับ" style={{ minWidth: '200px' }} />
              <Column field='model' header="รุ่น" style={{ minWidth: '200px' }} />
              <Column field='manufacturer' header="ผู้ผลิต" style={{ minWidth: '200px' }} />
              <Column field='installation_date' header="วันที่ติดตั้ง" style={{ minWidth: '200px' }} />
              <Column field='last_calibration_date' header="วันที่สอบเทียบล่าสุด" style={{ minWidth: '200px' }} />
              <Column field='next_calibration_due' header="วันที่ครบกำหนดสอบเทียบ" style={{ minWidth: '200px' }} />
              <Column field='tank_capacity' header="ความจุถัง (ลิตร)" style={{ minWidth: '200px' }} />
              <Column field='current_level' header="ระดับปัจจุบัน (ลิตร)" style={{ minWidth: '200px' }} />
              <Column field='status' header="สถานะ" style={{ minWidth: '200px' }} />
              <Column field='description' header="คำอธิบาย" style={{ minWidth: '200px' }} />
            </DataTable>

          </div>
        </div>
      </div>

      {/* โมดอลฟอร์มสำหรับเพิ่มรายการใหม่ */}
      <Dialog
        header="เพิ่มรายการใหม่"
        visible={formVisible}
        style={{ width: '50vw' }}
        onHide={() => setFormVisible(false)}
        footer={
          <div>
            <Button label="ยกเลิก" icon="pi pi-times" onClick={() => setFormVisible(false)} className="p-button-text" />
            <Button label="บันทึก" icon="pi pi-check" onClick={saveNewItem} />
          </div>
        }
      >


        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itematg_id" style={{ minWidth: '100px' }}>รหัสเครื่องมือวัดระดับ</label>
          <InputText
            id="itematg_id"
            value={newItematg_id}
            onChange={(e) => setnewItematg_id(e.target.value)}
            placeholder="กรอกรหัสเครื่องมือวัดระดับ"
            style={{ width: '100%' }}
          />
        </div>


        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemmodel" style={{ minWidth: '100px' }}>ชื่อรุ่น</label>
          <InputText
            id="itemmodel"
            value={newItemmodel}
            onChange={(e) => setnewItemmodel(e.target.value)}
            placeholder="กรอกชื่อรุ่น"
            style={{ width: '100%' }}
          />
        </div>

        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemmanufacturer" style={{ minWidth: '100px' }}>ผู้ผลิต</label>
          <InputText
            id="itemmanufacturer"
            value={newItemmanufacturer}
            onChange={(e) => setnewItemmanufacturer(e.target.value)}
            placeholder="กรอกผู้ผลิต"
            style={{ width: '100%' }}
          />
        </div>

        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="iteminstallation_date" style={{ minWidth: '100px' }}>วันที่ติดตั้ง</label>
          <InputText
            id="iteminstallation_date"
            value={newIteminstallation_date}
            onChange={(e) => setnewIteminstallation_date(e.target.value)}
            placeholder="กรอกวันที่ติดตั้ง"
            style={{ width: '100%' }}
          />
        </div>

        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemlast_calibration_date" style={{ minWidth: '100px' }}>วันที่สอบเทียบล่าสุด</label>
          <Calendar
            showIcon
            showButtonBar
            value={newItemlast_calibration_date}
            onChange={(e) => setnewItemlast_calibration_date(e.value ?? null)}
          />

        </div>


        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemnext_calibration_due" style={{ minWidth: '100px' }}>วันที่ครบกำหนดสอบเทียบ</label>
          <Calendar
            showIcon
            showButtonBar
            value={newItemnext_calibration_due}
            onChange={(e) => setnewItemnext_calibration_due(e.value ?? null)}
          />

        </div>



        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemtank_capacity" style={{ minWidth: '100px' }}>ความจุถัง (ลิตร)</label>
          <InputText
            id="itemtank_capacity"
            value={newItemtank_capacity}
            onChange={(e) => setnewItemtank_capacity(e.target.value)}
            placeholder="ความจุถัง (ลิตร)"
            style={{ width: '100%' }}
          />
        </div>


        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemcurrent_level" style={{ minWidth: '100px' }}>ระดับปัจจุบัน (ลิตร)</label>
          <InputText
            id="itemcurrent_level"
            value={newItemcurrent_level}
            onChange={(e) => setnewItemcurrent_level(e.target.value)}
            placeholder="ระดับปัจจุบัน (ลิตร)"
            style={{ width: '100%' }}
          />
        </div>



        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemstatus" style={{ minWidth: '100px' }}>สถานะ</label>
          <InputText
            id="itemstatus"
            value={newItemstatus}
            onChange={(e) => setnewItemstatus(e.target.value)}
            placeholder="สถานะ"
            style={{ width: '100%' }}
          />
        </div>


        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="itemdescription" style={{ minWidth: '100px' }}>คำอธิบาย</label>
          <InputTextarea
            id="itemdescription"
            value={newItemdescription}
            onChange={(e) => setnewItemdescription(e.target.value)}
            placeholder="คำอธิบาย"
            rows={5}
            style={{ width: '100%' }}
          />
        </div>



      </Dialog>
    </>
  );
};

export default LabsPage;