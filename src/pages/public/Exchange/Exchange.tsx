import React, { ReactElement, useEffect, useState } from 'react';
import { mockFetcher } from "../../../api/api";
import { useExchangeStore } from "../../../stores/exchangeStore";
import ApiError from "../../../components/common/ApiError";
import useSWR, { useSWRConfig } from "swr";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import CustomProgress from "../../../components/common/CustomProgress";
import { IRate } from "../../../typescript/entities";
import ExchangeTable from "./ExchangeTable";
import ExchangeConverter from "./ExchangeConverter";

export default function Exchange(): ReactElement {
  const { setData } = useExchangeStore()

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const {
    data,
    error,
    isLoading,
  } = useSWR<IRate[]>('/pubinfo?json&exchange&coursid=4', mockFetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onSuccess: (data) => {
      setData(data.map(item => ({
        ...item,
        initValues: {
          buy: item.buy,
          sale: item.sale,
        }
      })) || null)
    }
  })

  // implemented to properly handle loading state of swr with manual refetching
  const [swrLoading, setSwrLoading] = useState<boolean>(false)

  const { mutate } = useSWRConfig()

  useEffect(() => {
    setSwrLoading(isLoading)
  }, [isLoading]);

  const refetchData = async () => {
    setSwrLoading(true)

    await mutate('/pubinfo?json&exchange&coursid=4')

    setSwrLoading(false)
  }

  return (
    error && !swrLoading ?
      <ApiError
        message={error?.message || 'Unknown error'}
        retry={refetchData}
      /> :
      <Box sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        maxHeight: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant={isXs ? 'h5' : 'h4'}>Currency exchange</Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            {
              data && swrLoading && <CustomProgress sx={{ mr: 2 }} size={16}/>
            }
            <IconButton onClick={refetchData} title="Refresh data">
              <RefreshIcon/>
            </IconButton>
          </Box>
        </Box>

        {
          !data && swrLoading ?
            <CustomProgress/> :
            <>
              <ExchangeTable/>
              <ExchangeConverter/>
            </>
        }
      </Box>
  );
}