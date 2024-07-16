"use client"
import { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { getUsers, addUser, updateUser, deleteUser } from '../../lib/api/users';

const schema = yup.object().shape({
    fname: yup.string().required('First Name is required'),
    lname: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipcode: yup.string().matches(/^\d{5}$/, 'Invalid zipcode format').required('Zipcode is required'),
});

export default function Users() {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [remove, setRemove] = useState(false);
    const toast = useRef(null);
    const currentRemoveId = useRef(null);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            id: null,
            fname: '',
            lname: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            phone: ''
        }
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const onSubmit = async (data) => {
        if (data.id) {
            await updateUser(data);
        } else {
            await addUser(data);
        }
        reset();
        setVisible(false);
        fetchUsers();
    };

    const handleDeleteUser = async (id) => {
        currentRemoveId.current = id;
        setRemove(true);
    };

    const editUser = (user) => {
        reset(user);
        setVisible(true);
    };

    const accept = async (id) => {
        if (remove) {
            await deleteUser(id);
            toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have successfully removed', life: 3000 });
            fetchUsers();
        }
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the deletion process', life: 3000 });
    };

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog
                group="declarative"
                visible={remove}
                onHide={() => setRemove(false)}
                message="Are you sure you want to proceed?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={() => accept(currentRemoveId.current)}
                reject={reject}
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
            <Button className="mb-5" label="Add User" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <DataTable value={users}>
                <Column field="fname" header="First Name" />
                <Column field="lname" header="Last Name" />
                <Column field="email" header="Email" />
                <Column field="state" header="state" />
                <Column
                    body={(rowData) => (
                        <div>
                            <Button label="Edit" className="mr-2" onClick={() => editUser(rowData)} />
                            <Button label="Delete" severity="danger" onClick={() => handleDeleteUser(rowData.id)} />
                        </div>
                    )}
                    header="Actions"
                />
            </DataTable>

            <Dialog header="User" visible={visible} onHide={() => setVisible(false)} style={{ width: '50vw' }}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="firstname2">Firstname</label>
                        <Controller
                            name="fname"
                            control={control}
                            render={({ field }) => <InputText id="firstname2" type="text" placeholder='First Name' {...field} />}
                        />
                        {errors.fname && <small className="p-error">{errors.fname.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="lastname2">Lastname</label>
                        <Controller
                            name="lname"
                            control={control}
                            render={({ field }) => <InputText id="lastname2" type="text" placeholder='Last Name' {...field} />}
                        />
                        {errors.lname && <small className="p-error">{errors.lname.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="email">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <InputText id="email" type="text" placeholder="Email" {...field} />}
                        />
                        {errors.email && <small className="p-error">{errors.email.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="address">Address</label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => <InputTextarea id="address" rows={4} placeholder='Your address' {...field} />}
                        />
                        {errors.address && <small className="p-error">{errors.address.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="city">City</label>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => <InputText id="city" type="text" placeholder='City' {...field} />}
                        />
                        {errors.city && <small className="p-error">{errors.city.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="state">State</label>
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => <InputText id="state" type="text" placeholder='State' {...field} />}
                        />
                        {errors.state && <small className="p-error">{errors.state.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="zip">Zip</label>
                        <Controller
                            name="zipcode"
                            control={control}
                            render={({ field }) => <InputText id="zip" type="text" placeholder='Enter your Zipcode' {...field} />}
                        />
                        {errors.zipcode && <small className="p-error">{errors.zipcode.message}</small>}
                    </div>
                    <Button label="Save" icon="pi pi-check" type="submit" />
                </form>
            </Dialog>
        </div>
    );
}
