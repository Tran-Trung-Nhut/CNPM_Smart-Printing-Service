import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import 'primeicons/primeicons.css';
import './css/sidebar.css';
import { Link } from 'react-router-dom';

interface SidebarProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

export default function SidebarClone({ visible, setVisible }: SidebarProps) {
    const items: MenuItem[] = [
        {
            label: 'Quản lý in sinh viên',
            className: 'custom-menu-item',
            items: [
                {
                    command: () => setVisible(false),
                    template: () => (
                        <Link to="/SPSO/students" className="p-menuitem-link custom-menu-subitem">
                            <i className="pi pi-users p-menuitem-icon"></i>
                            <span className="p-menuitem-text">Danh sách sinh viên</span>
                        </Link>
                    ),
                },
                {
                    command: () => setVisible(false),
                    template: () => (
                        <Link to="/SPSO/students-printing-history" className="p-menuitem-link custom-menu-subitem-last">
                            <i className="pi pi-clock p-menuitem-icon"></i>
                            <span className="p-menuitem-text">Lịch sử in</span>
                        </Link>
                    ),
                },
            ],
        },
        {
            label: 'Quản lý máy in',
            className: 'custom-menu-item',
            items: [
                {
                    command: () => setVisible(false),
                    template: () => (
                        <Link to="/SPSO/printers" className="p-menuitem-link custom-menu-subitem">
                            <i className="pi pi-print p-menuitem-icon"></i>
                            <span className="p-menuitem-text">Danh sách máy in</span>
                        </Link>
                    ),
                },
                {
                    command: () => setVisible(false),
                    template: () => (
                        <Link to="/SPSO/printers-printing-history" className="p-menuitem-link custom-menu-subitem-last">
                            <i className="pi pi-clock p-menuitem-icon"></i>
                            <span className="p-menuitem-text">Lịch sử in</span>
                        </Link>
                    ),
                },
            ],
        },
        {
            label: 'Quản lý thông báo',
            className: 'custom-menu-item',
            items: [
                {
                    command: () => setVisible(false),
                    template: () => (
                        <Link to="/SPSO/informs" className="p-menuitem-link custom-menu-subitem">
                            <i className="pi pi-bell p-menuitem-icon"></i>
                            <span className="p-menuitem-text">Lịch sử thông báo</span>
                        </Link>
                    ),
                },
            ],
        },
    ];

    return (
        <Sidebar
            visible={visible}
            showCloseIcon={false}
            onHide={() => setVisible(false)}
            className="p-col-fixe custom-sidebar bg-white shadow w-[200px]"
            style={{ width: '200px', marginLeft: '5px', border: '2px solid #ccc' }}
        >
            <Menu model={items} className="bg-white custom-menu" />
        </Sidebar>
    );
}
