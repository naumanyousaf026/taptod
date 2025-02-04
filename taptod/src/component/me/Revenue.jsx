import React, { useState } from 'react';
import Header from '../Header_1';


const transactions = [
  {
    date: '2025-01-02',
    entries: [
      {
        type: 'Online reward',
        amount: '+Rs4.1666',
        balance: 'Rs84.9999',
        time: '11:15:44',
      },
      {
        type: 'Online reward',
        amount: '+Rs4.1666',
        balance: 'Rs80.8333',
        time: '01:15:49',
      },
    ],
  },
  {
    date: '2025-01-01',
    entries: [
      {
        type: 'Online reward',
        amount: '+Rs4.1666',
        balance: 'Rs76.6666',
        time: '15:16:00',
      },
      {
        type: 'Online reward',
        amount: '+Rs3.3333',
        balance: 'Rs72.4999',
        time: '05:15:38',
      },
    ],
  },
  {
    date: '2024-12-31',
    entries: [
      {
        type: 'Online reward',
        amount: '+Rs4.1666',
        balance: 'Rs69.1666',
        time: '21:15:32',
      },
      {
        type: 'Online reward',
        amount: '+Rs3.3333',
        balance: 'Rs64.9999',
        time: '11:16:07',
      },
    ],
  },
];

const Revenue = () => {

  const [filter, setFilter] = useState('all');

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const renderTransaction = (transaction) => {
    if (filter === 'all' || filter === transaction.date) {
      return (
        <div key={transaction.date} className="mb-6 sans">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
            {transaction.date}
          </h2>
          <div className="grid gap-4">
            {transaction.entries.map((entry, index) => (
              <div
                key={index}
                className="bg-[#e0f7e9e8]  rounded shadow-md py-4 px-3 "
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-[16px] font-bold roboto-slab text-[#008069] ">{entry.type}</p>
                    <p className="text-sm text-gray-500 sans mt-1">{entry.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[16px]  text-left roboto-slab font-bold text-[#008069] ">{entry.amount}</p>
                    <p className="text-sm text-gray-400 sans mt-1">Balance: {entry.balance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
        <Header />
        <div className=" px-3  py-4 ">
      <div className="w-full max-w-md mx-auto  rounded-xl shadow-2xl px-8 py-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-8 py-2 rounded-full roboto-slab font-medium transition-all duration-300 focus:outline-none ${filter === 'all' ? 'bg-[#008069] text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-green-200'}`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('Earning')}
              className={`px-5 py-2 rounded-full font-medium roboto-slab  transition-all duration-300 focus:outline-none ${filter === 'Earning' ? 'bg-[#008069] text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-green-200'}`}
            >
            Earning
            </button>
            <button
              onClick={() => handleFilterChange('Withdrawal')}
              className={`px-5 py-2 rounded-full font-mediumroboto-slab transition-all duration-300 focus:outline-none ${filter === 'Withdrawal' ? 'bg-[#008069] text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-green-200'}`}
            >
              Withdrawal
            </button>
          </div>
          <select
            onChange={(e) => handleFilterChange(e.target.value)}
            value={filter}
            className="px-5 py-3 bg-white border border-gray-300 rounded-full roboto-slab  focus:outline-none focus:ring-2 focus:ring-[#008069] transition-all w-full  mt-3"
          >
            <option value="all">All Dates</option>
            <option value="2025-01-02">2025-01-02</option>
            <option value="2025-01-01">2025-01-01</option>
            <option value="2024-12-31">2024-12-31</option>
          </select>
        </div>

        <div>
          {transactions.map((transaction) => renderTransaction(transaction))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Revenue;
