import { makeAutoObservable, toJS } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";
import antCharTheme from "../../../assets/json/antd-chart-theme.json";
import { Datum } from "@ant-design/charts";
import _ from "lodash";

class DashboardStore {

    currentAccount: any = {};

    accountInfoLoading: boolean = false;
    groupAndMemberLoading: boolean = false

	buyPerDayData: any = [
		{ year: "1/6", "API đã mua": 3 },
		{ year: "2/6", "API đã mua": 4 },
		{ year: "3/6", "API đã mua": 3.5 },
		{ year: "4/6", "API đã mua": 5 },
		{ year: "5/6", "API đã mua": 4.9 },
		{ year: "6/6", "API đã mua": 6 },
		{ year: "7/6", "API đã mua": 7 },
	];
	buyPerDayConfig: any = {
		theme: antCharTheme,
		data: this.buyPerDayData,
		//padding: 'auto',
		xField: "year",
		yField: "API đã mua",
		// xAxis: {
		//   tickCount: 5,
		// },
		// slider: {
		//   start: 0.1,
		//   end: 0.5,
		// },
		height: 300,
		color: "#2A94E7",
	};
	delayData: any = [
		{ year: "1/6", "Độ trễ": 10 },
		{ year: "2/6", "Độ trễ": 22 },
		{ year: "3/6", "Độ trễ": 15 },
		{ year: "4/6", "Độ trễ": 40 },
		{ year: "5/6", "Độ trễ": 35 },
		{ year: "6/6", "Độ trễ": 50 },
		{ year: "7/6", "Độ trễ": 25 },
	];
	delayConfig: any = {
		theme: antCharTheme,
		data: this.delayData,
		//padding: 'auto',
		xField: "year",
		yField: "Độ trễ",
		// xAxis: {
		//   tickCount: 5,
		// },
		// slider: {
		//   start: 0.1,
		//   end: 0.5,
		// },
		height: 272,
		color: "#FFA940",
		tooltip: {
			formatter: (datum: any) => {
				return { name: "Độ trễ", value: datum["Độ trễ"] + " ms" };
			},
		},
	};
	callAPICountData: any = [
		{
			api: "Apple",
			count: 320,
		},
		{
			api: "Amazon",
			count: 300,
		},
		{
			api: "Microsoft",
			count: 280,
		},
		{
			api: "Google",
			count: 260,
		},
		{
			api: "Samsung",
			count: 240,
		},
		{
			api: "Coca-Cola",
			count: 200,
		},
		{
			api: "Toyota",
			count: 175,
		},
		{
			api: "Mercedes",
			count: 150,
		},
		{
			api: "McDonald",
			count: 125,
		},
		{
			api: "Disney",
			count: 100,
		},
	];
	callAPICountConfig = {
        theme: antCharTheme,
		data: this.callAPICountData,
		xField: "count",
		yField: "api",
		meta: {
			api: {
				alias: "Tên API",
			},
			count: {
				alias: "Số lần gọi",
			},
		},
		minBarWidth: 10,
		maxBarWidth: 10,
		color: "#2A94E7",
		height: 300,
	};
	topEndpointData: any = [
		{
			endpoint: "Account",
			count: 320,
		},
		{
			endpoint: "Post",
			count: 300,
		},
		{
			endpoint: "Reel",
			count: 280,
		},
		{
			endpoint: "Image",
			count: 260,
		},
		{
			endpoint: "Page",
			count: 240,
		},
		{
			endpoint: "Group",
			count: 200,
		},
		{
			endpoint: "Share",
			count: 175,
		},
		{
			endpoint: "Like",
			count: 150,
		},
		{
			endpoint: "Comment",
			count: 125,
		},
		{
			endpoint: "Reaction",
			count: 100,
		},
	];
	topEndpointConfig = {
        theme: antCharTheme,
		data: this.topEndpointData,
		xField: "count",
		yField: "endpoint",
		meta: {
			endpoint: {
				alias: "Tên Endpoint",
			},
			count: {
				alias: "Số lần gọi",
			},
		},
		minBarWidth: 10,
		maxBarWidth: 10,
		color: "#36CFC9",
		height: 300,
	};
	callAPIByAppData: any = [
		{
			app: "Jira",
			count: 38,
		},
		{
			app: "Slack",
			count: 52,
		},
		{
			app: "Dropbox",
			count: 61,
		},
		{
			app: "Acello",
			count: 145,
		},
		{
			app: "Zoom",
			count: 48,
		},
		{
			app: "Atlassian",
			count: 38,
		},
		{
			app: "GSuite",
			count: 38,
		},
	];
	callAPIByAppConfig: any = {
        theme: antCharTheme,
		data: this.callAPIByAppData,
		xField: "app",
		yField: "count",
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			app: {
				alias: "App",
			},
			count: {
				alias: "Tổng số lần gọi",
			},
		},
		minColumnWidth: 15,
		maxColumnWidth: 15,
		height: 300,
		color: "#FFA940",
	};
	callAPIByStatusData: any = [
		//Lỗi
		{
			dateTime: "1/6",
			count: 11,
			type: "Lỗi",
		},
		{
			dateTime: "2/6",
			count: 22,
			type: "Lỗi",
		},
		{
			dateTime: "3/6",
			count: 15,
			type: "Lỗi",
		},
		{
			dateTime: "4/6",
			count: 16,
			type: "Lỗi",
		},
		{
			dateTime: "5/6",
			count: 20,
			type: "Lỗi",
		},
		{
			dateTime: "6/6",
			count: 18,
			type: "Lỗi",
		},
		{
			dateTime: "7/6",
			count: 10,
			type: "Lỗi",
		},
		//Thành công
		{
			dateTime: "1/6",
			count: 38,
			type: "Thành công",
		},
		{
			dateTime: "2/6",
			count: 52,
			type: "Thành công",
		},
		{
			dateTime: "3/6",
			count: 61,
			type: "Thành công",
		},
		{
			dateTime: "4/6",
			count: 145,
			type: "Thành công",
		},
		{
			dateTime: "5/6",
			count: 48,
			type: "Thành công",
		},
		{
			dateTime: "6/6",
			count: 38,
			type: "Thành công",
		},
		{
			dateTime: "7/6",
			count: 38,
			type: "Thành công",
		},
	];
	callAPIByStatusConfig: any = {
        theme: antCharTheme,
		data: this.callAPIByStatusData,
		xField: "dateTime",
		yField: "count",
		seriesField: "type",
		isStack: true,
		legend: {
			layout: "horizontal",
			position: "top-right",
		},
		label: {
			style: {
				opacity: 0,
			},
		},
		minColumnWidth: 15,
		maxColumnWidth: 15,
		height: 300,
		color: ["#FF7A45", "#73D13D"],
	};
	orgBuyAPIData: any = [
		{
			org: "FTP",
			count: 44,
		},
		{
			org: "CE",
			count: 55,
		},
		{
			org: "FLC",
			count: 22,
		},
		{
			org: "VNG",
			count: 66,
		},
		{
			org: "Viettel",
			count: 30,
		},
		{
			org: "MB",
			count: 40,
		},
		{
			org: "VCB",
			count: 20,
		},
	];
	orgBuyAPIConfig: any = {
        theme: antCharTheme,
		data: this.orgBuyAPIData,
		xField: "org",
		yField: "count",
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			org: {
				alias: "Tổ chức",
			},
			count: {
				alias: "Số API tổ chức đã mua",
			},
		},
		minColumnWidth: 15,
		maxColumnWidth: 15,
		height: 300,
		color: "#FFA940",
	};

	groupAndMemberData: any = [
		//Nhóm
		{
			org: "FTP",
			count: 11,
			type: "Nhóm",
		},
		{
			org: "CE",
			count: 22,
			type: "Nhóm",
		},
		{
			org: "FSI",
			count: 15,
			type: "Nhóm",
		},
		{
			org: "FLC",
			count: 16,
			type: "Nhóm",
		},
		{
			org: "VNG",
			count: 20,
			type: "Nhóm",
		},
		{
			org: "Zalo",
			count: 18,
			type: "Nhóm",
		},
		{
			org: "Sapo",
			count: 10,
			type: "Nhóm",
		},
		//Thành viên
		{
			org: "FTP",
			count: 38,
			type: "Thành viên",
		},
		{
			org: "CE",
			count: 52,
			type: "Thành viên",
		},
		{
			org: "FSI",
			count: 61,
			type: "Thành viên",
		},
		{
			org: "FLC",
			count: 145,
			type: "Thành viên",
		},
		{
			org: "VNG",
			count: 48,
			type: "Thành viên",
		},
		{
			org: "Zalo",
			count: 38,
			type: "Thành viên",
		},
		{
			org: "Sapo",
			count: 38,
			type: "Thành viên",
		},
	];
	groupAndMemberConfig: any = {
        theme: antCharTheme,
		data: this.groupAndMemberData,
		xField: "org",
		yField: "count",
		seriesField: "type",
		isGroup: true,
		legend: {
			layout: "horizontal",
			position: "top-right",
		},
		label: {
			style: {
				opacity: 0,
			},
		},
		minColumnWidth: 15,
		maxColumnWidth: 15,
		height: 300,
		color: ["#36CFC9", "#2A94E7"],
	};


	constructor() {
		makeAutoObservable(this);
	}

    accountInfoMethod = async (): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/accounts/me/`);
    }

    accountInfo = async () => {
        try {
            this.accountInfoLoading = true;
            const response = await this.accountInfoMethod()
            if (response.status == 200) {
                this.currentAccount = response.body
                console.log(toJS(this.currentAccount))
                this.accountInfoLoading = false;
            }
        } catch (error) {
            console.log(error);
        }
    };




    groupAndMemberMethod = async (account_id : any, filter: any, filter_method: any, filter_date: any): Promise<_IApiResponse> => {
        const preAxios = _.cloneDeep(axiosClient);
        if(window.location.hostname === 'localhost'){
            preAxios.defaults.baseURL = 'http://35.247.138.6:3009'
        }
        return preAxios.get(`/countorgs/${account_id}/${filter}?filter_method=${filter_method}&filter_date=${filter_date}`);
    }

    groupAndMember = async (account_id : any, filter: any, filter_method: any, filter_date: any) => {
        try {
            this.groupAndMemberLoading = true;
            const response = await this.groupAndMemberMethod(account_id, filter, filter_method, filter_date)

            if (response.status == 200) {
                this.groupAndMemberLoading = false
                console.log(response.body.results)

            }

        } catch (error) {
            console.log(error);
        }
    };



}

export const dashboardStore = new DashboardStore();
