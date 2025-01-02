import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const abortController = useRef(null);

  const [listings, setListings] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  useEffect(() => {
    const fetchListings = async () => {
      abortController.current = new AbortController();
      setisLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
      } finally {
        setisLoading(false);
      }
    };
    fetchListings();
    return () => {
      abortController.current?.abort();
    };
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };
  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }
    if (error) {
      return <div className='text-center'>{error}</div>;
    }
    return <ListingList listings={listings} />;
  };
  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;
