import { Engine } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import { useMotors } from '../../../hooks/useMotors';
import { Edit } from 'lucide-react';
import { Delete } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import Api from '../../../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
function Motors() {
    const { motors, isLoading } = useMotors()
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dtCadBodyTemplate = (rowData) => {
        return (
            rowData.dt_create ? new Date(rowData.dt_create).toLocaleDateString('pt-BR') : 'N/A'
        );
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="btn-action">
                <Button
                    icon={<Edit size={20} weight='fill' color='white' />}
                    className="btn-edit"
                    label='Editar'
                    onClick={() =>
                        navigate('/admin/motors/register', {
                            state: {
                                id_motor: rowData.id_motor,
                                pageName: `022 - Edição de motor`,
                                pageTitle: 'Editar Motor',
                                labelNameForm: 'Nome do Motor',
                                routeEdit: '/motors/edit',
                                initialData: {
                                    name: rowData.name,
                                    status: rowData.status,
                                }
                            },
                        })
                    }
                />
                <Button
                    icon={<XCircle size={20} weight='fill' color='white' />}
                    className="btn-delete"
                    label='Excluir'
                    onClick={() => {
                        Swal.fire({
                            title: 'Excluir motor',
                            text: `Tem certeza que deseja excluir o motor ${rowData.name}?`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sim, excluir!',
                            reverseButtons: true,
                            focusCancel: true,
                            focusConfirm: false,
                            customClass: {
                                popup: 'sweet-alert-zindex'
                            },
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                toast.success(`Motor ${rowData.name} excluído com sucesso!`);
                                return
                                // const result = await Api.delete(`/motors/delete/${rowData.id_motor}`);
                                // console.log('result', result);
                                // if (result.status === 200) {
                                //     toast.success('Motor excluído com sucesso!');
                                //     await queryClient.invalidateQueries(['motors']);
                                //     // window.location.reload();
                                //     return
                                // } else {
                                //     toast.error(`Erro ao excluir motor. Tente novamente. ${result.error}`);
                                //     return
                                // }
                            }
                        })
                    }
                    }
                />
            </div>
        );
    }
    const statusBodyTemplate = (rowData) => {
        return rowData.status === 'active' ? "Ativo" : "Inativo";
    }
    const rowClassName = (data, index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };
    return (
        isLoading ? (
            <GenericLoader />
        ) : (
            <main style={{ position: 'relative', padding: '20px', zIndex: 20000 }} className='w-full'>
                {console.log('motors', motors)}
                <section className="header-list w-full">
                    <h3 className="text-header">003 - Listagem de Motores</h3>
                    <br />
                </section>
                <section className="title-page">
                    <div style={{ padding: '20px' }}> <h1 className='title'> Listagem de Motores</h1></div>
                </section>
                <section className="content-list">
                    <div className="search-and-include">
                        <div className="search">
                            <input type="text" placeholder="Pesquisar" />
                            <Button icon={<Search size={20} color='white' />} iconPos='left' className="button-search" />
                        </div>
                        <div className="include">
                            <NavLink to="/admin/motors/register">
                                <Button
                                    label="Cadastrar motor"
                                    icon={<Engine size={30} weight='fill' />}
                                    className="button-include"
                                    onClick={() => console.log('Cadastrar motor')}
                                />
                            </NavLink>
                        </div>
                    </div>
                    <div className="card espacing-table">
                        <DataTable value={motors} tableStyle={{ minWidth: '108rem', zIndex: 1000, position: 'relative' }} rowClassName={rowClassName} paginator rows={20} responsiveLayout="scroll" showGridlines>
                            <Column field="id_motor" header="Código" headerClassName='header-table' headerStyle={{ borderTopLeftRadius: '5px' }} align={'center'} bodyClassName="body-table"></Column>
                            <Column header="Nome do Motor" field='name' headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                            <Column field="dt_created" header="Data de Cadastro" body={dtCadBodyTemplate} headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                            <Column field="status" header="Status" body={statusBodyTemplate} headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                            <Column header="Ações" body={actionBodyTemplate} headerClassName='header-table' headerStyle={{ borderTopRightRadius: '5px' }} align={'center'} bodyClassName="body-table"></Column>
                        </DataTable>
                    </div>
                </section>
            </main >
        )
    );
}

export default Motors;