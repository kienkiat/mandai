import { useEffect, useState } from 'react';
import {
    fetchProducts,
    deleteProductApi,
    updateInventoryApi, // Add this for updating inventory
} from '../../api/productApi';
import ProductFormModal from '../../components/Admin/ProductFormModal';
import StockEditModal from '../../components/Admin/StockEditModal';
import styles from './AdminProducts.module.css';
import { toast } from 'react-toastify';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string;
    status: number;
    imageUrl?: string;
    inventory: any;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStockEditModalOpen, setIsStockEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [stockToEdit, setStockToEdit] = useState<number | null>(null); // New state for stock edit

    const loadProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetchProducts(page, 10);
            setProducts(res.data);
            setTotalPages(Math.ceil(res.pagination.total / res.pagination.limit));
        } catch (err) {
            console.error('Failed to fetch products:', err);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts(page);
    }, [page]);

    const openCreateModal = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setProductToEdit(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure to delete this product?')) {
            try {
                await deleteProductApi(id);
                toast.success('Product deleted', { className: 'toast-success-custom' });
                loadProducts(page);
            } catch (err) {
                console.error('Delete failed:', err);
                toast.error('Failed to delete product');
            }
        }
    };

    const handleStockEdit = (product: Product) => {
        setStockToEdit(product.inventory ? product.inventory.quantity : 0);
        setProductToEdit(product);
        setIsStockEditModalOpen(true);
    };

    const handleStockUpdate = async (newStock: number) => {
        if (productToEdit) {
            try {
                await updateInventoryApi(productToEdit.id, newStock);
                toast.success('Stock updated successfully', { className: 'toast-success-custom' });
                setIsStockEditModalOpen(false);
                loadProducts(page);
            } catch (err) {
                console.error('Failed to update stock:', err);
                toast.error('Failed to update stock');
            }
        }
    };

    const handleSuccess = () => {
        loadProducts(page);
    };

    return (
        <div className={styles.container}>
            <h1>Manage Products</h1>

            <button onClick={openCreateModal} className={styles.createButton}>
                + Create Product
            </button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Stocks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>
                                    {p.imageUrl ? (
                                        <img
                                            src={p.imageUrl.startsWith('http') ? p.imageUrl : `${process.env.REACT_APP_API_BASE_URL || ''}${p.imageUrl}`}
                                            alt={p.name}
                                            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </td>
                                <td>{p.name}</td>
                                <td>${parseFloat(p.price).toFixed(2)}</td>
                                <td>{p.status === 1 ? 'Active' : 'Inactive'}</td>
                                <td>{p.inventory ? p.inventory.quantity : 0}</td>
                                <td>
                                    <button onClick={() => openEditModal(p)}>Edit</button>
                                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                                    <button onClick={() => handleStockEdit(p)}>Stock</button> {/* New button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                        Prev
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            )}

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                productToEdit={productToEdit}
                onSuccess={handleSuccess}
            />

            {/* Modal for Stock Edit */}
            <StockEditModal
                isOpen={isStockEditModalOpen}
                onClose={() => setIsStockEditModalOpen(false)}
                currentStock={stockToEdit || 0}
                onSave={handleStockUpdate}
            />
        </div>
    );
}
