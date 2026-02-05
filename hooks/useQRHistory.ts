"use client";

import { useState, useEffect } from 'react';

export interface QRHistoryItem {
    id: string;
    content: string;
    fgColor: string;
    bgColor: string;
    name: string;
    preset: string;
    createdAt: number;
}

const STORAGE_KEY = 'qr-gen-history';

export function useQRHistory() {
    const [history, setHistory] = useState<QRHistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }
    }, []);

    const saveToHistory = (content: string, fgColor: string, bgColor: string, name: string = 'Untitled', preset: string = 'classic') => {
        const newItem: QRHistoryItem = {
            id: crypto.randomUUID(),
            content,
            fgColor,
            bgColor,
            name,
            preset,
            createdAt: Date.now(),
        };

        const updated = [newItem, ...history];
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteItem = (id: string) => {
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { history, saveToHistory, deleteItem, clearHistory };
}
