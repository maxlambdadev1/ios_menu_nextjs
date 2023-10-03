'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link"

export function TransactionData() {
    const [address, setAddress] = useState('');
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        let addr = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
        setAddress(addr)
        getTransactions(addr)
    }, []);

    const getTransactions = async (address: string) => {
        try {
            const url = `/api/address/${address}/transactions`;
            const response: any = await axios.get(url);
            console.log('result', response);
            if (response.data.status === '1') {
                setTransactions(response.data.result);
            } else {
                setTransactions([]);
            }
            console.log('response', response, response.status)

        } catch (error) {
            console.error(error);
        }
    }

    const onSearch = () => {
        if (!!address) {
            getTransactions(address);
        }
    }

    return (
        <div className='mt-4'>
            <label htmlFor="address-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="address-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by address" required
                    value={address} onChange={(e) => setAddress(e.target.value)} />
                <button type="button"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onSearch}>
                    Search
                </button>
            </div>
            <h2 className='text-2xl font-bold py-4'>Transactions</h2>
            {transactions.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Txn Hash
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Method
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Block
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    From
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    To
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Value
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Txn Fee
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction: any, index: number) => (
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                                    <td className="px-6 py-4">
                                        {parseInt(transaction.confirmations) > 0 ? 'success' : 
                                        ( <span className='text-red'>pending</span>) }
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link href={`/tx/${transaction.hash}`}>
                                            <p className='w-24 truncate text-cyan-500 hover:text-cyan-700'>{transaction.hash}</p>
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {transaction.methodId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transaction.blockNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(transaction.timeStamp * 1000).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className='w-24 truncate'>{transaction.from}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className='w-24 truncate'>{transaction.to}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {(parseInt(transaction.value) * (1e-18)).toFixed(10)} ETH
                                    </td>
                                    <td className="px-6 py-4">
                                        {(parseInt(transaction.gasPrice) * parseInt(transaction.gasUsed) * (1e-18)).toFixed(10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>There are no transactions</p>
            )}
        </div>
    )
}