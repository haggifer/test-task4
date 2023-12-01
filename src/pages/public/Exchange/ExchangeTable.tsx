import React, { ReactElement, useState } from 'react';
import { useExchangeStore } from "../../../stores/exchangeStore";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckIcon from '@mui/icons-material/Check';
import { validateRateInputValue } from "../../../utils/helpers/common";

interface IEditValue {
  id: string,
  key: 'buy' | 'sale',
  value: string,
  initValue: string,
}

export default function ExchangeTable(): ReactElement {
  const { data, setData } = useExchangeStore()

  const [editValue, setEditValue] = useState<IEditValue | null>(null)

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  const [editableWidth] = useState<number>(175)

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const handleEdit = () => {
    if (!editValue || !data) {
      return
    }

    setData([...data].map(item => (
      editValue.id.includes(`${item.ccy}/${item.base_ccy}`) ?
        {
          ...item,
          [editValue.key]: editValue.value,
        } :
        item
    )))

    setEditValue(null)
  }

  return (
    <>
      {
        !data ?
          <Typography variant="subtitle1" sx={{
            mt: 3,
          }}>Nothing found</Typography> :
          <TableContainer component={Paper} sx={{
            mt: 3,
          }}>
            <Table sx={{
              width: '100%',
              ...isXs ? {
                'th, td': {
                  px: '10px',
                },
              } : {},
            }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Quote Currency / Base Currency</TableCell>
                  <TableCell sx={{ width: 0 }}>Buy</TableCell>
                  <TableCell sx={{ width: 0 }}>Sell</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.ccy + row.base_ccy}
                  >
                    <TableCell align="center">
                      {`${row.ccy}/${row.base_ccy}`}
                    </TableCell>
                    {
                      ([
                        {
                          key: 'buy',
                          value: row.buy,
                          initValue: row.initValues.buy,
                        },
                        {
                          key: 'sale',
                          value: row.sale,
                          initValue: row.initValues.sale,
                        }
                      ] as { key: IEditValue['key'], value: string, initValue: string }[]).map(cell => (
                        <TableCell sx={{
                          width: 0,
                          py: '8px',
                        }} key={cell.key + cell.value}>
                          <Box sx={{
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minHeight: '40px',
                            marginInline: 'auto',
                            textAlign: 'left',
                            cursor: 'pointer',
                            '> .MuiIconButton-root': {
                              ml: 1,
                            },
                            ...isXs ? {
                              minWidth: `105px`,
                            } : {
                              minWidth: `${editableWidth}px`,
                              '> .MuiBox-root': {
                                minWidth: '70px',
                              },
                              '> .MuiIconButton-root': {
                                mr: '34px',
                                transition: '0.15s',
                              },
                              '&:not(:hover)': {
                                '> .MuiIconButton-root': {
                                  opacity: 0,
                                },
                              },
                            },
                          }}>
                            {
                              editValue?.id === `${cell.key}${row.ccy}/${row.base_ccy}` && !isXs ?
                                <TextField
                                  type="number"
                                  variant="standard"
                                  value={editValue.value}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue({
                                    ...editValue,
                                    value: e.target.value,
                                  })}
                                  InputProps={{
                                    sx: {
                                      justifyContent: 'space-between',
                                      minWidth: `${editableWidth}px`,
                                      ml: -2,
                                      pr: 0,
                                      'input': {
                                        minWidth: '85px',
                                        p: 2,
                                        fontSize: '0.875rem',
                                      },
                                    },
                                    endAdornment: (
                                      <>
                                        <IconButton
                                          onClick={handleEdit}
                                          title="Submit"
                                          size="small"
                                          disabled={!validateRateInputValue(Number(editValue.value), Number(editValue.initValue))}
                                        >
                                          <CheckIcon/>
                                        </IconButton>
                                        <IconButton
                                          onClick={() => setEditValue(null)}
                                          title="Cancel"
                                          size="small"
                                        >
                                          <DoDisturbIcon/>
                                        </IconButton>
                                      </>
                                    ),
                                  }}
                                /> :
                                <>
                                  <Box>{cell.value}</Box>
                                  <IconButton
                                    size="small"
                                    title="Edit"
                                    onClick={() => {
                                      setEditValue({
                                        id: `${cell.key}${row.ccy}/${row.base_ccy}`,
                                        key: cell.key,
                                        value: cell.value,
                                        initValue: cell.initValue || '',
                                      })

                                      isXs && setEditModalOpen(true)
                                    }}
                                  >
                                    <EditIcon/>
                                  </IconButton>
                                </>
                            }
                          </Box>
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <>
          {
            editValue &&

            <TextField
              type="number"
              variant="standard"
              value={editValue.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue({
                ...editValue,
                value: e.target.value,
              })}
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                width: '100%',
                transform: 'translateX(-50%)',
                background: '#fff',
              }}
              InputProps={{
                sx: {
                  justifyContent: 'space-between',
                  minWidth: `${editableWidth}px`,
                  pr: 0,
                  'input': {
                    minWidth: '85px',
                    minHeight: '40px',
                    p: 2,
                    fontSize: '0.875rem',
                  },
                },
                endAdornment: (
                  <>
                    <IconButton
                      onClick={() => {
                        handleEdit()

                        setEditModalOpen(false)
                      }}
                      title="Submit"
                      size="small"
                      disabled={!validateRateInputValue(Number(editValue.value), Number(editValue.initValue))}
                    >
                      <CheckIcon/>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEditValue(null)

                        setEditModalOpen(false)
                      }}
                      title="Cancel"
                      size="small"
                    >
                      <DoDisturbIcon/>
                    </IconButton>
                  </>
                ),
              }}
            />
          }
        </>
      </Modal>
    </>
  )
}