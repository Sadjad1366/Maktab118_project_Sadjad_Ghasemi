import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

// Custom hook to use the correctly typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
