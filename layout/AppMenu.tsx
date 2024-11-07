/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },

        {
            label: 'Database',
            items: [
                { label: 'โรงงานอุตสาหกรรมผู้ผลิต', icon: 'pi pi-fw pi-database', to: '/database/customers' },
                { label: 'ข้อมูลเครื่องมือวัดระดับ', icon: 'pi pi-fw pi-database', to: '/database/atg' },
                { label: 'ข้อมูลเครื่องมือมาตรวัด', icon: 'pi pi-fw pi-database', to: '/database/tool' },
                { label: 'ข้อมูลบรรจุภัณฑ์ ', icon: 'pi pi-fw pi-database', to: '/database/tank' },
                { label: 'ข้อมูลชนิดเอทานอล', icon: 'pi pi-fw pi-database', to: '/database/ethanal' },
                { label: 'ข้อมูลอัตราภาษี', icon: 'pi pi-fw pi-database', to: '/database/tax' },
                { label: 'ข้อมูลราคาขายปลีก', icon: 'pi pi-fw pi-database', to: '/database/seal' },
                { label: 'ข้อมูลรถบรรทุกรับส่ง', icon: 'pi pi-fw pi-database', to: '/database/car' },
                { label: 'ข้อมูลผู้ใช้ระบบ', icon: 'pi pi-fw pi-database', to: '/database/users' },
                { label: 'กำหนดสิทธิ์ผู้ใช้', icon: 'pi pi-fw pi-database', to: '/database/permissions' },
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
