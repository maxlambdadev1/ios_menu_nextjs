'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link"
interface Props {
    transactionHash: string
}
export function TransactionDetail({ transactionHash }: Props) {
    const [transactionInfo, setTransactionInfo] = useState<any>({});

    useEffect(() => {
        getTransactionDetail(transactionHash)
    }, []);

    const getTransactionDetail = async (transactionHash: string) => {
        try {
            const url = `/api/transactions/${transactionHash}`;
            const response: any = await axios.get(url);
            console.log('result', response);
            if (response.status === 200) {
                setTransactionInfo(response.data.result);
            } else {
                setTransactionInfo({});
            }
            console.log('response', response, response.status)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='mt-4 mx-auto max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <h2 className='text-2xl font-bold py-4'>Transaction Information</h2>
            {Object.keys(transactionInfo).length > 0 ? (
                <div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Transaction Hash</div>
                        <div className='md:w-9/12'>{transactionInfo.hash}</div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Status</div>
                        <div className='md:w-9/12'>
                            {parseInt(transactionInfo.confirmations) > 0 ? 'success' :
                                (<span className='text-red'>pending</span>)}
                        </div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Block</div>
                        <div className='md:w-9/12'>
                            {transactionInfo.blockNumber}
                            <span className='border-radius'>{transactionInfo.confirmations} Block Confirmations</span>
                        </div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Timestamp</div>
                        <div className='md:w-9/12'>
                            {new Date(parseInt(transactionInfo.timeStamp) * 1000).toLocaleString()}
                        </div>
                    </div>
                    <hr />
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>From</div>
                        <div className='md:w-9/12'>{transactionInfo.from}</div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>To</div>
                        <div className='md:w-9/12'>{transactionInfo.to}</div>
                    </div>
                    <hr />
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Value</div>
                        <div className='md:w-9/12'>
                            {(parseInt(transactionInfo.value) * (1e-18)).toFixed(18).replace(/0+$/, '')} ETH
                        </div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Transaction Fee</div>
                        <div className='md:w-9/12'>
                            {(parseInt(transactionInfo.gasPrice) * parseInt(transactionInfo.gasUsed) * (1e-18)).toFixed(18).replace(/0+$/, '')} ETH
                        </div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='md:w-3/12'>Gas Price</div>
                        <div className='md:w-9/12'>
                        {(parseInt(transactionInfo.gasPrice)  * (1e-18)).toFixed(18).replace(/0+$/, '')} ETH
                        </div>
                    </div>
                </div>
            ) : (
                <p className='mt-4 font-light'>There is no the transaction.</p>
            )}
        </div>
    )
}