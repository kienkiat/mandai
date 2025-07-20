
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProductApi, updateProductApi } from '../../api/productApi';
import styles from './ProductFormModal.module.css';
import { toast } from 'react-toastify';

interface Product {
    id?: number;
    name: string;
    description?: string;
    price: string;
    status: number;
    imageUrl?: string;
    image?: FileList;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    productToEdit: Product | null;
    onSuccess: () => void;
}

export default function ProductFormModal({ isOpen, onClose, productToEdit, onSuccess }: Props) {
    const { register, handleSubmit, reset, setValue, watch } = useForm<Product>({
        defaultValues: productToEdit || {
            name: '',
            description: '',
            price: '',
            status: 1,
        },
    });

    const [preview, setPreview] = useState<string | undefined>(undefined);

    const watchImage = watch('image');

    useEffect(() => {
        if (productToEdit) {
            reset(productToEdit);
            setPreview(
                productToEdit.imageUrl
                    ? (productToEdit.imageUrl.startsWith('http')
                        ? productToEdit.imageUrl
                        : `${process.env.REACT_APP_API_BASE_URL || ''}${productToEdit.imageUrl}`)
                    : undefined
            );
        } else {
            reset({
                name: '',
                description: '',
                price: '',
                status: 1,
            });
            setPreview(undefined);
        }
    }, [productToEdit, reset]);

    useEffect(() => {
        if (watchImage && watchImage.length > 0) {
            const file = watchImage[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else if (productToEdit && productToEdit.imageUrl) {
            setPreview(
                productToEdit.imageUrl.startsWith('http')
                    ? productToEdit.imageUrl
                    : `${process.env.REACT_APP_API_BASE_URL || ''}${productToEdit.imageUrl}`
            );
        } else {
            setPreview(undefined);
        }
    }, [watchImage, productToEdit]);

    const onSubmit = async (data: Product & { image?: FileList }) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        formData.append('price', data.price);
        formData.append('status', String(data.status));
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        try {
            if (productToEdit && productToEdit.id) {
                await updateProductApi(productToEdit.id, formData);
            } else {
                await createProductApi(formData);
            }
            onSuccess();
            reset();
            toast.success('Product saved successfully', { className: 'toast-success-custom' });
            onClose();
        } catch (err) {
            console.error('Error submitting product:', err);
            toast.error('Failed to save product');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{productToEdit ? 'Edit Product' : 'Create Product'}</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <input {...register('name', { required: true })} placeholder="Name" />
                    <textarea {...register('description')} placeholder="Description" />
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { required: true })}
                        placeholder="Price"
                    />

                    <select {...register('status')} className={styles.select} required>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>

                    <input type="file" {...register('image')} accept="image/*" />

                    {preview && (
                        <div className={styles.imagePreview}>
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150 }} />
                        </div>
                    )}

                    <div className={styles.buttons}>
                        <button type="submit">{productToEdit ? 'Update' : 'Create'}</button>
                        <button type="button" onClick={() => onClose()}>
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
