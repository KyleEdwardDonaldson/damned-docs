import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';

interface User {
  Username: string;
  IsFounder: boolean;
  CachesUncovered: number;
  AverageTrophyRarity: number;
  TrophyCount: number;
}

const fakeData: User[] = [
  { Username: 'Alice', IsFounder: true, CachesUncovered: 120, AverageTrophyRarity: 3, TrophyCount: 15 },
  { Username: 'Bob', IsFounder: false, CachesUncovered: 85, AverageTrophyRarity: 5, TrophyCount: 10 },
  { Username: 'Charlie', IsFounder: true, CachesUncovered: 200, AverageTrophyRarity: 2, TrophyCount: 25 },
  { Username: 'Diana', IsFounder: false, CachesUncovered: 50, AverageTrophyRarity: 8, TrophyCount: 5 },
];

const Leaderboard: React.FC = () => {
    const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const [users, setUsers] = useState<User[]>([]);
  const [sortKey, setSortKey] = useState<'AverageTrophyRarity' | 'CachesUncovered'>('AverageTrophyRarity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const useFakeData = true; // Toggle this to switch between fake data and API

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        if (useFakeData) {
          setUsers(fakeData);
        } else {
          const response = await fetch(customFields.REACT_APP_BACKEND_URL + '/users/leaderboard');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUsers(data);
        }
      } catch (err: any) {
        setError('Failed to fetch leaderboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [useFakeData]);

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortChange = (key: 'AverageTrophyRarity' | 'CachesUncovered') => {
    if (key === sortKey) {
      toggleSortOrder();
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Layout title="Leaderboard">
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
      <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Sort by:</span>
          </label>
          <select
            value={sortKey}
            onChange={(e) => handleSortChange(e.target.value as 'AverageTrophyRarity' | 'CachesUncovered')}
            className="select select-bordered"
          >
            <option value="AverageTrophyRarity">Lowest Average Trophy Rarity</option>
            <option value="CachesUncovered">Caches Uncovered</option>
          </select>
        </div>
      <div className="flex justify-center mb-4">
        
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Username</th>
              <th
                className="cursor-pointer"
                onClick={() => handleSortChange('CachesUncovered')}
              >
                Caches Uncovered {sortKey === 'CachesUncovered' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSortChange('AverageTrophyRarity')}
              >
                Average Trophy Rarity {sortKey === 'AverageTrophyRarity' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Trophy Count</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td className={user.IsFounder ? 'text-[#FF5733]' : ''}>{user.Username}</td>
                <td>{user.CachesUncovered}</td>
                <td>{user.AverageTrophyRarity}</td>
                <td>{user.TrophyCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default Leaderboard;
