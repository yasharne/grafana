import React from 'react';
import { css } from '@emotion/css';
import { DatePicker } from '../DatePicker/DatePicker';
import { Props as InputProps, Input } from '../Input/Input';
import { useStyles } from '../../themes';

export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export interface DatePickerWithInputProps extends Omit<InputProps, 'ref' | 'value' | 'onChange'> {
  value?: Date;
  onChange: (value: Date) => void;
  /** Hide the calendar when  ate is selected */
  closeOnSelect?: boolean;
}

export const DatePickerWithInput = ({ value, onChange, closeOnSelect, ...rest }: DatePickerWithInputProps) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles(getStyles);
  return (
    <div className={styles.container}>
      <Input
        type="date"
        value={value ? formatDate(value) : undefined}
        onClick={() => setOpen(true)}
        onChange={() => {}}
        className={styles.input}
        {...rest}
      />
      <DatePicker
        isOpen={open}
        value={value}
        onChange={(ev) => {
          onChange(ev);
          if (closeOnSelect) {
            setOpen(false);
          }
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

const getStyles = () => {
  return {
    container: css`
      position: relative;
    `,
    input: css`
    /* hides the native Calendar picker icon given when using type=date */
    input[type='date']::-webkit-inner-spin-button,
    input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
    `,
  };
};
