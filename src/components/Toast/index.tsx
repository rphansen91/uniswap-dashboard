import React, {
  Component,
  FC,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

type IAlert = {
  severity?: AlertProps["severity"];
  autoHideDuration?: number;
  content: any;
};

type IToastContext = {
  open: boolean;
  alert: IAlert | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<SetStateAction<IAlert | null>>;
};

export const ToastContext = createContext<null | IToastContext>(null);
export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error(`ToastProvider not found in tree`);
  return ctx;
};

export const ToastProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<null | IAlert>(null);
  const value = useMemo(
    () => ({
      open,
      setOpen,
      alert,
      setAlert: (
        v: (IAlert | null) | ((v: IAlert | null) => IAlert | null)
      ) => {
        setOpen(true);
        setAlert(v);
      },
    }),
    [open, alert]
  );
  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={alert?.autoHideDuration ?? 6000}
      >
        <Alert severity={alert?.severity}>{alert?.content}</Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export class ErrorBoundary extends Component<
  { fallback: (error: any) => React.ReactNode; onError: (error: any) => any },
  { error?: any; hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    // trackWarning('Error Boundary', error, info)
    if (this.props.onError) this.props.onError(error);
    if (/Loading chunk (.*) failed./.test(error.message)) {
      this.setState({
        error: {
          message: "New version found, please reload.",
        },
      });
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { fallback, children } = this.props;
    const { error } = this.state;
    if (error) return fallback(error);
    return children;
  }
}
