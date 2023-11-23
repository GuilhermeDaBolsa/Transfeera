import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

interface RequestArgs extends AxiosRequestConfig {
	//reminder, all functions below executes before isLoading becomes false
	onSuccess?: () => void;
	onError?: () => void;
	onFinish?: () => void;
}

class Requester<ResponseType> {
	isLoading: boolean;
	isError: boolean;
	errorObj: AxiosError | null;
	errorMessage: string;
	response: ResponseType | null;
	requestCount: number;
	axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.isLoading = false;
		this.isError = false;
		this.errorObj = null;
		this.errorMessage = "";
		this.response = null;
		this.requestCount = 0;
		this.axiosInstance = axiosInstance;
	}

	request(args: RequestArgs) {
		this.isLoading = true;
		this.requestCount += 1;

		return this.axiosInstance.request<ResponseType>(args)
			.then(({ data }) => {
				this.isError = false;
				this.errorObj = null;

				this.response = data;

				if (args.onSuccess) args.onSuccess();
			})
			.catch((err: AxiosError) => {
				this.isError = true;
				this.errorObj = err;
				this.errorMessage = Requester.extractAxiosErrorMessage(err);

				if (args.onError) args.onError();
			})
			.finally(() => {
				if (args.onFinish) args.onFinish();

				this.isLoading = false;
			});
	}

	static extractAxiosErrorMessage(axiosError: AxiosError | null): string {
		if (!axiosError) return "";
	
		if (axiosError.response?.data) return axiosError.response.data as string;
	
		return axiosError.message;
	}
}

export default Requester;
