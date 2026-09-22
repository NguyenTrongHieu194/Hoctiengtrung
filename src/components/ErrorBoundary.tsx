import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || "Đã xảy ra lỗi không xác định" };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in React component tree:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Đã xảy ra sự cố hiển thị</h2>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Ứng dụng gặp lỗi khi khởi động trên trình duyệt của bạn. Bấm nút bên dưới để khởi động lại nhanh.
              </p>
            </div>
            {this.state.errorMessage && (
              <div className="bg-slate-100 p-2.5 rounded-xl text-left text-xs font-mono text-slate-600 overflow-x-auto max-h-24">
                {this.state.errorMessage}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tải lại ứng dụng</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
