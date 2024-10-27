'use client'
import UserForm from '@/components/forms/user/UserForm';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { LayoutConfig } from '@/types';
import { IUserModel, defaultUser } from '@/types/user';
import { FilterMatchMode } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { useContext, useEffect, useState } from 'react';


import { getUsers } from './action';

const items: MenuItem[] = [{ label: 'Database' }, { label: 'ข้อมูลพนักงาน' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }


const menuItems: MenuItem[] = [
  {
    label: 'เพิ่ม',
    icon: 'pi pi-plus'
  },
  {
    label: 'ค้นหา',
    icon: 'fa-solid fa-magnifying-glass'
  },

];

function CustomersPage() {
  const { setLayoutConfig, layoutConfig } = useContext(LayoutContext);
  const [data, setData] = useState<IUserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserModel>(defaultUser);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>('new');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


  useEffect(() => {
    setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ripple: true }));
    get_user_data();
    setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
  }, []);

  const get_user_data = async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      setData(users);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Failed to fetch users.");
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

  const staff_name_display = (item: IUserModel) => {
    return `${item.user_name} ${item.user_surname}`
  }

  
  const action_display = (item: IUserModel) => {
    return (
      <div style={{ width: '100%' }} className='flex justify-content-between'>
        <Button icon='fa-solid fa-pencil'  onClick={e => edit_handle(item)} title='คลิก เพื่อแก้ไขข้อมูล' rounded />
        <Button icon='fa-solid fa-key' severity="warning" title='คลิก เพื่อเปลี่ยนรหัสผ่าน' rounded/>
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


  const new_handle = () => {
    setFormMode('new')
    setUser(defaultUser);
    setFormVisible(true);
  }


  const edit_handle = (item: IUserModel) => {
    setFormMode('edit')
    setUser(item);
    setFormVisible(true);
  }


  return (
    <>
      <BreadCrumb model={items} home={home} />

      <UserForm User={user} visible={formVisible} onHide={() => setFormVisible(false)} mode={formMode} />

      <div className='grid'>

        <div className='col-12 md:col-12 mt-2'>
          <div className="card ">

            <DataTable
              loading={loading}
              value={data}
              filters={filters}
              globalFilterFields={['user_id', 'user_name', 'user_login', 'email', 'position', 'permission']}
              stripedRows
              header={header_display}
              paginator rows={15}
              tableStyle={{ maxWidth: '100%' }}>
              <Column field='user_id' header="Code" style={{ maxWidth: '5%' }}></Column>
              <Column body={staff_name_display} field='user_name' header="ชื่อพนักงาน" style={{ maxWidth: '15%' }} ></Column>
              <Column field='user_login' header="User name" style={{ maxWidth: '15%' }}></Column>
              <Column field='phone' header="โทรศัพท์" style={{ maxWidth: '15%' }}></Column>
              <Column field='email' header="Email" style={{ maxWidth: '10%' }}></Column>
              <Column field='position' header="ตำแหน่ง" style={{ maxWidth: '15%' }}></Column>
              <Column field='permission' header="สิทธิ์" style={{ maxWidth: '15%' }}></Column>
              <Column body={action_display} header="เลือก" style={{ width: '10%' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomersPage