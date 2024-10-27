//npm run dev
//node server.js
'use client'
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ICustomer, defaultCustomer } from '@/types/customer';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import React, { useRef,useContext, useEffect, useState } from 'react';
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
  const [newItemcust_id, setnewItemcust_id] = useState('');
  const [newItemcust_name, setnewItemcust_name] = useState('');
  const [newItemcust_address, setnewItemcust_address] = useState('');
  const [newItemcontact_phone, setnewItemcontact_phone] = useState('');
  const [newItemcontact_gps, setnewItemcontact_gps] = useState('');
  

  const new_handle = () => {
    setFormVisible(true);
    setnewItemcust_id('');
    setnewItemcust_name('');
    setnewItemcust_address('');
    setnewItemcontact_phone('');
    setnewItemcontact_gps('');
    
  };


  const deleteItem = async (cust_id) => {
    try {
        const response = await fetch(`http://localhost:3001/api/items/delete?cust_id=${cust_id}`, {
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
      cust_id: newItemcust_id,
      cust_name: newItemcust_name,
      cust_address: newItemcust_address,
      contact_phone: newItemcontact_phone,
      contact_gps: newItemcontact_gps
    };
  //const response = await fetch(`http://localhost:3001/api/items/add?cust_id=${newItem.cust_id}&cust_name=${encodeURIComponent(newItem.cust_name)}&cust_address=${encodeURIComponent(newItem.cust_address)}&contact_phone=${newItem.contact_phone}&contact_gps=${newItem.contact_gps}`, {
    try {
      const response = await fetch(`http://localhost:3001/api/items/add?cust_id=${newItem.cust_id}&cust_name=${encodeURIComponent(newItem.cust_name)}&cust_address=${encodeURIComponent(newItem.cust_address)}&contact_phone=${newItem.contact_phone}&contact_gps=${newItem.contact_gps}`, {
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

  
  const [data, setData] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [labs, setLabs] = useState<ICustomer>(defaultCustomer);
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
      const response = await fetch('/data.json');
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
  
  const action_display = (item: ICustomer) => {
    return (
      <div style={{ width: '100%' }} className='flex justify-content-between'>
         <Button icon="pi pi-check" severity="success" style={{ marginRight: '.5em' }} title='คลิก เพื่อแก้ไขข้อมูล' onClick={e => edit_handle(item)}/>
         <Button
                icon="pi pi-trash"
                severity="warning"
                style={{ marginRight: '.5em' }}
                title='คลิก เพื่อลบรายการ'
                onClick={async () => {
                    const confirmDelete = window.confirm("คุณแน่ใจว่าต้องการลบรายการนี้?");
                    if (confirmDelete) {
                        await deleteItem(item.cust_id); // ตรวจสอบว่ามี item.cust_id
                    }
                }}
            />
      </div>
    )
  }

  const edit_handle = (item: ICustomer) => { }  
   // ฟังก์ชันสำหรับแสดงพิกัด GPS ด้วย HTML
 
  
   // ฟังก์ชันสำหรับแสดงพิกัด GPS ด้วย HTML
   const renderContactGps = (rowData: ICustomer) => {
    return (
      <div>
        {rowData.contact_gps ? (
          <div dangerouslySetInnerHTML={{ __html: rowData.contact_gps }} />
        ) : (
          <span>No GPS data available</span> // หรือข้อความอื่น ๆ ที่คุณต้องการแสดง
        )}
      </div>
    );
};


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
            value={data}
            scrollable
            filters={filters}
            globalFilterFields={['cust_id', 'cust_name', 'cust_address', 'contact_phone', 'contact_gps']}
            stripedRows
            paginator
            rows={15}
          >
            <Column body={action_display} header="เลือก" style={{ minWidth: '100px' }}></Column>
            <Column field="cust_id" header="ลำดับ"></Column>
            <Column field="cust_name" header="ชื่อโรงงาน" style={{ minWidth: '200px' }}></Column>
            <Column field="cust_address" header="ที่อยู่" style={{ minWidth: '200px' }}></Column>
            <Column field="contact_phone" header="โทรศัพท์" style={{ minWidth: '150px' }}></Column>
            <Column body={renderContactGps} header="พิกัดที่ตั้ง" style={{ minWidth: '50px' }} /> {}

          </DataTable>
        </div>
      </div>
    </div>

   {/* โมดอลฟอร์มสำหรับเพิ่มรายการใหม่ */}
   <Dialog
        header="เพิ่มรายการใหม่"
        visible={formVisible}
        style={{ width: '30vw' }}
        onHide={() => setFormVisible(false)}
        footer={
          <div>
            <Button label="ยกเลิก" icon="pi pi-times" onClick={() => setFormVisible(false)} className="p-button-text" />
            <Button label="บันทึก" icon="pi pi-check" onClick={saveNewItem} />
          </div>
        }
      >


<div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <label htmlFor="itemcust_id" style={{ minWidth: '100px' }}>รหัสโรงงาน</label>
  <InputText
    id="itemcust_id"
    value={newItemcust_id}
    onChange={(e) => setnewItemcust_id(e.target.value)}
    placeholder="กรอกรหัสโรงงาน"
    style={{ width: '100%' }}
  />
</div>


<div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <label htmlFor="itemcust_name" style={{ minWidth: '100px' }}>ชื่อโรงงาน</label>
  <InputText
    id="itemcust_name"
    value={newItemcust_name}
    onChange={(e) => setnewItemcust_name(e.target.value)}
    placeholder="กรอกชื่อโรงงาน"
    style={{ width: '100%' }}
  />
</div>

<div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <label htmlFor="itemcust_address" style={{ minWidth: '100px' }}>ที่อยู่</label>
  <InputTextarea
    id="itemcust_address"
    value={newItemcust_address}
    onChange={(e) => setnewItemcust_address(e.target.value)}
    placeholder="กรอกที่อยู่"
    rows={5}
    style={{ width: '100%' }}
  />
</div>

<div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <label htmlFor="itemcontact_phone" style={{ minWidth: '100px' }}>โทรศัพท์</label>
  <InputText
    id="itemcontact_phone"
    value={newItemcontact_phone}
    onChange={(e) => setnewItemcontact_phone(e.target.value)}
    placeholder="กรอกโทรศัพท์"
    style={{ width: '100%' }}
  />
</div>

<div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <label htmlFor="itemcontact_gps" style={{ minWidth: '100px' }}>พิกัด</label>
  <InputText
    id="itemcontact_gps"
    value={newItemcontact_gps}
    onChange={(e) => setnewItemcontact_gps(e.target.value)}
    placeholder="กรอกพิกัดที่ตั้ง"
    style={{ width: '100%' }}
  />
</div>


      </Dialog>
    </>
  );
};

export default LabsPage;