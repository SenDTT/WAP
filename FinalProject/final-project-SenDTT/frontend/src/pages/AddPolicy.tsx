import React, { useContext, useEffect, useState } from 'react';
import DropdownList from '../components/ListBox';
import { Context } from '../Global';
import { Category } from '../types/policyTypes';
import { addPolicy } from '../api';
import Layout from '../components/Layout';
import { Navigate } from 'react-router-dom';

const AddPolicyPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { categories, isAuthenticated, user } = useContext(Context);
    const [selected, setSelected] = useState<Pick<Category, "id" | "name"> | null>(null);

    useEffect(() => {
        if (categories.length > 0) {
            setSelected(categories[0]);
        }
    }, [categories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated() || !user) {
            alert('Please login to add new policy');
            return;
        }

        if (!title || !body || !selected) {
            alert('All fields are required.');
            return;
        }

        const policyData = {
            title,
            body,
            category_id: selected.id,
            owner_id: user.id
        };

        await addPolicy({ body: policyData });

        alert('Policy added successfully!');

        setTimeout(() => {
            Navigate({ to: '/' });
        }, 1);
        // Reset form
        setTitle('');
        setBody('');
        setSelected(categories[0]);
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Add Policy</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter policy title"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Body */}
                    <div>
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                            Body
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter policy body (HTML supported)"
                            rows={6}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div>
                        {categories && Array.isArray(categories) && (
                            <DropdownList setSelected={setSelected} categories={categories} selected={selected} />
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Policy
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddPolicyPage;
