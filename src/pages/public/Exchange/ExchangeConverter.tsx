import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useExchangeStore } from '../../../stores/exchangeStore';
import {
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import {
  CommonSelect,
  CommonSelectProps,
} from '../../../components/common/CommonSelect';
import { ISelectOption } from '../../../typescript/common';
import _ from 'lodash';
import { roundToPrecision } from '../../../utils/helpers/common';

export default function ExchangeConverter(): ReactElement {
  const { data } = useExchangeStore();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const [reversedExchange, setReversedExchange] = useState<boolean>(false);

  const [currencySelectStyles] = useState<
    CommonSelectProps<string, false>['styles']
  >({
    control: {
      borderRadius: '0',
      borderWidth: '0 0 1px 0',
    },
  });

  const [quoteValue, setQuoteValue] = useState<string>('0');
  const [baseValue, setBaseValue] = useState<string>('0');

  const [quoteCurrency, setQuoteCurrency] = useState<
    ISelectOption<string> | undefined
  >(undefined);
  const [baseCurrency, setBaseCurrency] = useState<
    ISelectOption<string> | undefined
  >(undefined);

  const quoteCurrencyOptions = useMemo<ISelectOption<string>[]>(() => {
    if (!data) {
      return [];
    }

    return _.uniqBy(
      data
        .filter(
          (item) =>
            !baseCurrency?.value || item.base_ccy === baseCurrency.value,
        )
        .map((item) => ({
          label: item.ccy,
          value: item.ccy,
        })),
      'value',
    );
  }, [data, baseCurrency]);

  const baseCurrencyOptions = useMemo<ISelectOption<string>[]>(() => {
    if (!data) {
      return [];
    }

    return _.uniqBy(
      data
        .filter(
          (item) => !quoteCurrency?.value || item.ccy === quoteCurrency.value,
        )
        .map((item) => ({
          label: item.base_ccy,
          value: item.base_ccy,
        })),
      'value',
    );
  }, [data, quoteCurrency]);

  const currentRate = useMemo<{
    buy: number;
    sale: number;
  } | null>(() => {
    const targetItem = data?.find(
      (item) =>
        item.ccy === quoteCurrency?.value &&
        item.base_ccy === baseCurrency?.value,
    );

    if (!targetItem) {
      return null;
    }

    return {
      buy: Number(targetItem.buy),
      sale: Number(targetItem.sale),
    };
  }, [quoteCurrency, baseCurrency, data]);

  useEffect(() => {
    reversedExchange
      ? updateQuoteValue(baseValue)
      : updateBaseValue(quoteValue);
  }, [currentRate]);

  useEffect(() => {
    if (!quoteCurrency) {
      setQuoteCurrency(quoteCurrencyOptions[0]);
    }
  }, [quoteCurrencyOptions]);

  useEffect(() => {
    if (!baseCurrency) {
      setBaseCurrency(baseCurrencyOptions[0]);
    }
  }, [baseCurrencyOptions]);

  const validateInputValue = (value: string) => {
    return /^(\d+(\.\d*)?)?$/.test(value);
  };

  const updateBaseValue = useCallback(
    (oppositeValue: string) => {
      if (!currentRate) {
        return;
      }

      setBaseValue(
        reversedExchange
          ? String(
              roundToPrecision(Number(oppositeValue) * currentRate.sale, 5),
            )
          : String(
              roundToPrecision(Number(oppositeValue) * currentRate.buy, 5),
            ),
      );
    },
    [currentRate],
  );

  const updateQuoteValue = useCallback(
    (oppositeValue: string) => {
      if (!currentRate) {
        return;
      }

      setQuoteValue(
        reversedExchange
          ? String(
              roundToPrecision(Number(oppositeValue) / currentRate.sale, 5),
            )
          : String(
              roundToPrecision(Number(oppositeValue) / currentRate.buy, 5),
            ),
      );
    },
    [currentRate],
  );

  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      {data && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...(isXs
              ? {
                  position: 'relative',
                  flexFlow: 'column wrap',
                  pl: 10,
                }
              : {}),
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            <TextField
              type="string"
              InputLabelProps={{ shrink: true }}
              label="Change"
              placeholder="Type here..."
              variant="standard"
              value={reversedExchange ? quoteValue : baseValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (validateInputValue(e.target.value)) {
                  if (reversedExchange) {
                    setQuoteValue(e.target.value);

                    updateBaseValue(e.target.value);
                  } else {
                    setBaseValue(e.target.value);

                    updateQuoteValue(e.target.value);
                  }
                }
              }}
              sx={{
                flexGrow: 1,
              }}
            />
            <Box
              component={CommonSelect}
              value={reversedExchange ? quoteCurrency : baseCurrency}
              onChange={(newValue) =>
                reversedExchange
                  ? setQuoteCurrency(newValue as ISelectOption<string>)
                  : setBaseCurrency(newValue as ISelectOption<string>)
              }
              options={
                reversedExchange ? quoteCurrencyOptions : baseCurrencyOptions
              }
              menuPlacement="top"
              styles={currencySelectStyles}
              sx={{
                flexShrink: 0,
                ml: 2,
              }}
            />
          </Box>
          <IconButton
            onClick={() => setReversedExchange(!reversedExchange)}
            title="Swap currencies"
            sx={{
              ...(isXs
                ? {
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    transform: 'translateY(-50%)',
                  }
                : {
                    mx: 3,
                  }),
            }}
            data-testid="swap-button"
          >
            <CompareArrowsOutlinedIcon
              sx={{
                ...(isXs
                  ? {
                      fontSize: '32px',
                      transform: 'rotate(90deg)',
                    }
                  : {}),
              }}
            />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-end',
              width: '100%',
              ...(isXs
                ? {
                    mt: 2,
                  }
                : {}),
            }}
          >
            <TextField
              type="string"
              InputLabelProps={{ shrink: true }}
              label="Get"
              placeholder="Type here..."
              variant="standard"
              value={reversedExchange ? baseValue : quoteValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (validateInputValue(e.target.value)) {
                  if (reversedExchange) {
                    setBaseValue(e.target.value);

                    updateQuoteValue(e.target.value);
                  } else {
                    setQuoteValue(e.target.value);

                    updateBaseValue(e.target.value);
                  }
                }
              }}
              sx={{
                flexGrow: 1,
              }}
            />
            <Box
              component={CommonSelect}
              value={reversedExchange ? baseCurrency : quoteCurrency}
              onChange={(newValue) =>
                reversedExchange
                  ? setBaseCurrency(newValue as ISelectOption<string>)
                  : setQuoteCurrency(newValue as ISelectOption<string>)
              }
              options={
                reversedExchange ? baseCurrencyOptions : quoteCurrencyOptions
              }
              menuPlacement="top"
              styles={currencySelectStyles}
              sx={{
                flexShrink: 0,
                ml: 2,
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
