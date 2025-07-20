import React, { useState, useEffect } from 'react';
import styles from './StockEditModal.module.css';

interface StockEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStock: number;
    onSave: (newStock: number) => void;
}

const StockEditModal = ({ isOpen, onClose, currentStock, onSave }: StockEditModalProps) => {
    console.log("currentStock", currentStock);

    const [newStock, setNewStock] = useState(currentStock);

    useEffect(() => {
        setNewStock(currentStock);
    }, [currentStock]);

    const handleSave = () => {
        onSave(newStock);
        setNewStock(0);
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Edit Stock Quantity</h2>
                <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    min="0"
                    className={styles.stockInput}
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                    <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default StockEditModal;
