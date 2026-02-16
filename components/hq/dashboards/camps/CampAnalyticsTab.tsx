"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camp, CampAnalytics, CampFormValues } from "@/lib/types/api";

interface CampAnalyticsTabProps {
	initialData?: Partial<CampFormValues>;
}

export function CampAnalyticsTab({ initialData }: CampAnalyticsTabProps) {
	// const analytics: CampAnalytics | undefined = initialData?.analytics;
	// const analytics: CampAnalytics = initialData?.analytics || {
	const analytics: CampAnalytics = {
		schedule: {
			meetupDate: "2025-12-25",
			status: "Active",
		},
		ticketsSummary: {
			totalTravellers: 10,
			seatsConfirmed: 7,
			confirmedTickets: 5,
			basePrice: 1200000
		},
		paymentBreakdown: {
			national: [
				{
					date: "2025-12-20",
					totalTicketsSold: 5,
					baseAmount: 6000000, // In Paisa -> 25000000
					gst: 1080000,
					grossAmount: 7080000,
					gatewayCharges: 141600,
					softwareCharges: 708000,
					totalDeductions: 849600,
					netAmount: 6230400,
				}
			],
			international: [
				{
					date: "2025-12-20",
					ticketsSold: 2,
					baseAmount: 2400000,
					gst: 432000,
					grossAmount: 2832000,
					cardFee: 113280,
					conversionFee: 42480,
					gatewayFee: 84960,
					softwareCost: 283200,
					totalDeductions: 523900,
					netAmount: 2308080,
					gstOnCardFee: 0
				}
			],
		},
		netPaymentSummary: {
			national: { tickets: 5, netAmount: 6372000 },
			international: { tickets: 2, netAmount: 2364720 },
			total: { tickets: 7, netAmount: 8736720 },
		},
		settlements: {
			toPlatform: { amount: 9912000, date: "2025-12-22", settlementId: "SETTL_12345" },
			toCamp: { amount: 8538480, date: "2025-12-26", settlementId: "SETTL_67890" },
		},
		refunds: {
			initiated: { amount: 8538480, date: "2025-12-30", settlementId: "REF_ABCD" },
			local: 6230400,
			international: 2308080,
			toTravellers: 8538480,
		},
		ageAnalysis: { high: 30, average: 24, low: 20 },
		genderRatio: { male: 4, female: 2, trans: 1, preferNotToSay: 0 },
		maxTravellerTraffic: [
			{ rank: 1, city: "Delhi", state: "DL", country: "India", ageGroup: "20-25", genderRatio: "M:2 F:2 T:0 O:0", count: 4 },
			{ rank: 2, city: "Mumbai", state: "MH", country: "India", ageGroup: "25-30", genderRatio: "M:2 F:0 T:1 O:0", count: 3 },
		]
	};


	if (!analytics) {
		return (
			<div className="bg-white rounded-lg p-8">
				<h3 className="text-lg font-semibold text-gray-900">Camp Analytics</h3>
				<p className="text-sm text-gray-500 mt-1">
					Analytics will be available once bookings start.
				</p>
			</div>
		);
	}

	const formatCurrency = (amount: number) => {
		return (amount / 100).toLocaleString("en-IN", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "short" });
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	// const analytics = {
	// 	schedule: {
	// 		meetupDate: "2024-12-25",
	// 		status: "Completed",
	// 	},
	// 	ticketsSummary: {
	// 		totalTravelers: 150,
	// 		seatsConfirmed: 145,
	// 	},
	// 	paymentBreakdown: {
	// 		national: [
	// 			{
	// 				date: "2024-12-20",
	// 				totalTicketsSold: 100,
	// 				baseAmount: 500000,
	// 				gst: 90000,
	// 				gatewayCharges: 10000,
	// 				softwareCharges: 40000,
	// 				netAmount: 530000,
	// 			}
	// 			// {
	// 			// 	date: "2024-12-21",
	// 			// 	totalTicketsSold: 50,
	// 			// 	baseAmount: 250000,
	// 			// 	gst: 45000,
	// 			// 	gatewayCharges: 5000,
	// 			// 	softwareCharges: 20000,
	// 			// 	netAmount: 260000,
	// 			// },
	// 		],
	// 		international: [
	// 			{
	// 				date: "2024-12-20",
	// 				ticketsSold: 50,
	// 				baseAmount: 300000,
	// 				cardFee: 12000,
	// 				gstOnCardFee: 2160,
	// 				conversionFee: 4500,
	// 				gatewayFee: 9000,
	// 				softwareCost: 24000,
	// 				netAmount: 311660,
	// 			}
	// 			// {
	// 			// 	date: "2024-12-22",
	// 			// 	ticketsSold: 20,
	// 			// 	baseAmount: 120000,
	// 			// 	cardFee: 4800,
	// 			// 	gstOnCardFee: 864,
	// 			// 	conversionFee: 1800,
	// 			// 	gatewayFee: 3600,
	// 			// 	softwareCost: 9600,
	// 			// 	netAmount: 124200,
	// 			// },
	// 		],
	// 	},
	// 	netPaymentSummary: {
	// 		national: { tickets: 100, netAmount: 530000 },
	// 		international: { tickets: 50, netAmount: 311660 },
	// 		total: { tickets: 150, netAmount: 841660 },
	// 	},
	// 	payment: {
	// 		to100DegreeClub: { amount: 84166, date: "2024-12-22", settlementId: "SETTL_12345" },
	// 		toCamp: { amount: 757494, date: "2024-12-23", settlementId: "SETTL_67890" },
	// 	},
	// 	refund: {
	// 		initiated: { amount: 10000, date: "2024-12-26", settlementId: "REF_abcd" },
	// 		local: 5000,
	// 		international: 5000,
	// 		toTravelers: 10000,
	// 	},
	// 	ageAnalysis: { high: 45, average: 28, low: 18 },
	// 	genderRatio: { male: 80, female: 60, trans: 5, preferNotToSay: 5 },
	// 	maxTravelerTraffic: [
	// 		{ number: 1, city: "Mumbai", state: "MH", country: "India", ageGroup: "25-30", genderRatio: "M:F:T:O - 6:4:2:1", count: 20 },
	// 		{ number: 2, city: "Delhi", state: "DL", country: "India", ageGroup: "20-25", genderRatio: "M:F:T:O - 5:5:1:1", count: 15 },
	// 	],
	// 	repeatTravelers: [
	// 		{ name: "John Doe", age: 30, gender: "Male", city: "Mumbai", state: "MH", country: "India", totalVisits: 5, nationalVisits: 4, internationalVisits: 1, campName: "Goa Beach Camp", totalSpend: 50000 },
	// 	],
	// };

	return (
		<div className="bg-zinc-950 space-y-8 text-zinc-100 mb-8">
			{/* Header */}
			<div className="space-y-4">
				<div>
					<h3 className="text-xl font-bold text-white">
						Camp Analytics
					</h3>
				</div>
				<Card className="bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden shadow-sm">
					<CardContent>
						<p className="text-base text-zinc-400">
							<span className="font-bold text-zinc-100 mr-2">
								Status:
							</span>
							{analytics.schedule.status}
						</p>
					</CardContent>
				</Card>
			</div>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Tickets Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableBody>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 text-left text-zinc-400 font-medium">Total Tickets</TableCell>
                                    <TableCell className="col-span-4 text-right text-white ">{analytics.ticketsSummary.totalTravellers}</TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 text-left text-zinc-400 font-medium">Tickets Sold</TableCell>
                                    <TableCell className="col-span-4 text-right text-white ">{analytics.ticketsSummary.seatsConfirmed}</TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 text-left text-zinc-400 font-medium">Tickets Confirmed</TableCell>
                                    <TableCell className="col-span-4 text-right text-white">{analytics.ticketsSummary.confirmedTickets}</TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-none hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 text-left text-zinc-400 font-medium">Base Price(per seat)</TableCell>
                                    <TableCell className="col-span-4 text-right text-white ">₹{formatCurrency(analytics.ticketsSummary.basePrice)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Net Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="border-b border-zinc-900">
                                    <TableHead className="w-[50%] text-left font-bold text-zinc-500  text-[11px] ">Category</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[11px] ">Tickets Sold</TableHead>
                                    <TableHead className="w-[30%] text-left font-bold text-zinc-500  text-[11px]  text-right">Net Amount Received to The Camp</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                    <TableCell className="text-left font-medium py-3 text-zinc-300">National</TableCell>
                                    <TableCell className="text-left py-3 text-zinc-400 ">
                                        {analytics.netPaymentSummary.national.tickets}
                                    </TableCell>
                                    <TableCell className="text-left py-3 text-right text-white ">
                                        ₹{formatCurrency(analytics.netPaymentSummary.national.netAmount)}
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                    <TableCell className="text-left font-medium py-3 text-zinc-300">International</TableCell>
                                    <TableCell className="text-left py-3 text-zinc-400 ">
                                        {analytics.netPaymentSummary.international.tickets}
                                    </TableCell>
                                    <TableCell className="text-left py-3 text-right text-white ">
                                        ₹{formatCurrency(analytics.netPaymentSummary.international.netAmount)}
                                    </TableCell>
                                </TableRow>

                                {/* Summary row with a slight background and stronger font weight */}
                                <TableRow className="bg-zinc-900/80 border-none">
                                    <TableCell className="text-left font-bold py-4 text-white">Total</TableCell>
                                    <TableCell className="text-left font-bold py-4 text-white ">
                                        {analytics.netPaymentSummary.total.tickets}
                                    </TableCell>
                                    <TableCell className="text-left font-bold py-4 text-right text-white ">
                                        ₹{formatCurrency(analytics.netPaymentSummary.total.netAmount)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="national" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-zinc-900 p-1 border border-zinc-800 rounded-lg">
                            <TabsTrigger value="national" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-500 font-bold text-xs  ">National Payments (INR)</TabsTrigger>
                            <TabsTrigger value="international" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-500 font-bold text-xs  ">International Payments (INR)</TabsTrigger>
                        </TabsList>

                        <TabsContent value="national" className="mt-0 outline-none">
                            <div className="overflow-x-auto">
                                {analytics.paymentBreakdown.national.map((data, index) => (
                                    <Table key={index} className="w-full mb-8 last:mb-0 border border-zinc-900 rounded-lg overflow-hidden">
                                        <TableHeader className="bg-zinc-900/30">
                                            <TableRow className="border-b border-zinc-900 hover:bg-transparent">
                                                <TableHead className="w-[50%] text-left font-bold text-zinc-500  text-[10px] ">Metric</TableHead>
                                                <TableHead className="w-[25%] text-left font-bold 	text-zinc-500  text-[10px] ">Value</TableHead>
                                                <TableHead className="w-[25%] text-left font-bold text-zinc-500  text-[10px]  text-right">Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Total Tickets Sold</TableCell>
                                                <TableCell className="text-left py-3 text-white ">{data.totalTicketsSold}/7</TableCell>
                                                <TableCell className="text-left py-3 text-right text-zinc-400">{formatDate(data.date)}</TableCell>
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Ticket's Base Amount</TableCell>
                                                <TableCell className="text-left py-3 text-white ">₹{formatCurrency(data.baseAmount)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">GST (18%)</TableCell>
                                                <TableCell className="text-left py-3 text-white ">₹{formatCurrency(data.gst)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Gross Amount</TableCell>
                                                <TableCell className="text-left py-3 text-white ">₹{formatCurrency(data.grossAmount)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Payment Gateway Charges (2%)</TableCell>
                                                <TableCell className="text-left py-3 text-red-400/80 ">-₹{formatCurrency(data.gatewayCharges)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">100 Degree Software Charges (10%)</TableCell>
                                                <TableCell className="text-left py-3 text-red-400/80 ">-₹{formatCurrency(data.softwareCharges)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Total Deductions</TableCell>
                                                <TableCell className="text-left py-3 text-red-400 ">₹{formatCurrency(data.totalDeductions)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Net Amount Received to The Camp</TableCell>
                                                <TableCell className="text-left py-3 text-green-400 ">₹{formatCurrency(data.netAmount)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="international" className="mt-0 outline-none">
                            <div className="overflow-x-auto">
                                {analytics.paymentBreakdown.international.map((data, index) => (
                                    <Table key={index} className="w-full mb-8 last:mb-0 border border-zinc-900 rounded-lg overflow-hidden">
                                        <TableHeader className="bg-zinc-900/30">
                                            <TableRow className="border-b border-zinc-900 hover:bg-transparent">
                                                <TableHead className="w-[50%] text-left font-bold text-zinc-500  text-[10px] ">Metric</TableHead>
                                                <TableHead className="w-[25%] text-left font-bold text-zinc-500  text-[10px] ">Value</TableHead>
                                                <TableHead className="w-[25%] text-left font-bold text-zinc-500  text-[10px]  text-right">Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Tickets Sold</TableCell>
                                                <TableCell className="text-left py-3 text-white ">{data.ticketsSold}/7</TableCell>
                                                <TableCell className="text-right py-3 text-zinc-400">{formatDate(data.date)}</TableCell>
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Ticket's Base Amount</TableCell>
                                                <TableCell className="text-left py-3 text-white ">₹{formatCurrency(data.baseAmount)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">GST (18%)</TableCell>
                                                <TableCell className="text-left py-3 text-white ">₹{formatCurrency(data.gst)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Gross Amount</TableCell>
                                                <TableCell className="text-left py-3 text-white ">₹{formatCurrency(data.grossAmount)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">International Card Fee (4%)</TableCell>
                                                <TableCell className="text-left py-3 text-red-400/80 ">-₹{formatCurrency(data.cardFee)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Currency Conversion Fee (1.5%)</TableCell>
                                                <TableCell className="text-left py-3 text-red-400/80 ">-₹{formatCurrency(data.conversionFee)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Payment Gateway Fee (3%)</TableCell>
                                                <TableCell className="text-left py-3 text-red-400/80 ">-₹{formatCurrency(data.gatewayFee)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">100 Degree Software Cost (10%)</TableCell>
                                                <TableCell className="text-left py-3 text-red-400/80 ">-₹{formatCurrency(data.softwareCost)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Total Deductions</TableCell>
                                                <TableCell className="text-left py-3 text-red-400 ">₹{formatCurrency(data.totalDeductions)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                            <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                                <TableCell className="text-left py-3 text-zinc-400">Net Amount Received to The Camp</TableCell>
                                                <TableCell className="text-left py-3 text-green-400">₹{formatCurrency(data.netAmount)}</TableCell>
                                                <TableCell className="text-left py-3" />
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white">Payment To Your Camp</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="border-b border-zinc-900">
                                    <TableHead className="w-[40%] text-left font-bold text-zinc-500  text-[10px] ">Metric</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px] ">Amount</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px] ">Date / Time</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px]  text-right">Settlement ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                    <TableCell className="text-left font-medium py-4 text-zinc-300">
                                        Money Deposited To 100degree's Bank
                                    </TableCell>
                                    <TableCell className="text-left py-4 text-white ">
                                        ₹{formatCurrency(analytics.settlements.toPlatform.amount)}
                                    </TableCell>
                                    <TableCell className="text-left py-4 text-white ">
                                        {formatDate(analytics.settlements.toPlatform.date)}
                                    </TableCell>
                                    <TableCell className="text-right py-4 text-white">
                                        {analytics.settlements.toPlatform.settlementId}
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-none">
                                    <TableCell className="text-left font-bold py-4 text-zinc-300">
                                        Money Deposited to Your Camp
                                    </TableCell>
                                    <TableCell className="text-left py-4 text-white  font-bold">
                                        ₹{formatCurrency(analytics.settlements.toCamp.amount)}
                                    </TableCell>
                                    <TableCell className="text-left py-4 text-white ">
                                        {formatDate(analytics.settlements.toCamp.date)}
                                    </TableCell>
                                    <TableCell className="text-right py-4 text-white">
                                        {analytics.settlements.toCamp.settlementId}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Refund</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="border-b border-zinc-900">
                                    <TableHead className="w-[40%] text-left font-bold text-zinc-500  text-[10px] ">Metric</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px] ">Amount</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px] ">Date / Time</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px]  text-right">Settlement ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                    <TableCell className="text-left font-medium py-4 text-zinc-300">Refund Initiated</TableCell>
                                    <TableCell className="text-left py-4 text-zinc-300 ">₹{formatCurrency(analytics.refunds.initiated.amount)}</TableCell>
                                    <TableCell className="text-left py-4 text-white ">{formatDate(analytics.refunds.initiated.date)}</TableCell>
                                    <TableCell className="text-right py-4 text-white">
                                        {analytics.refunds.initiated.settlementId}
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                    <TableCell className="text-left py-4 text-zinc-400">Refund Local Payments</TableCell>
                                    <TableCell className="text-left py-4 text-white ">₹{formatCurrency(analytics.refunds.local)}</TableCell>
                                    <TableCell className="text-left py-4" />
                                    <TableCell className="text-left py-4" />
                                </TableRow>

                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                    <TableCell className="text-left py-4 text-zinc-400">Refund International Payments</TableCell>
                                    <TableCell className="text-left py-4 text-white ">₹{formatCurrency(analytics.refunds.international)}</TableCell>
                                    <TableCell className="text-left py-4" />
                                    <TableCell className="text-left py-4" />
                                </TableRow>

                                <TableRow className="hover:bg-zinc-900/50 transition-colors border-none bg-zinc-900/30">
                                    <TableCell className="text-left font-bold py-5 text-white">Money Refund to the Travellers</TableCell>
                                    <TableCell className="text-left font-bold py-5 text-white ">₹{formatCurrency(analytics.refunds.toTravellers)}</TableCell>
                                    <TableCell className="text-left py-5" />
                                    <TableCell className="text-left py-5" />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Age Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableBody>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Oldest</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.ageAnalysis.high} yrs
                                    </TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Average</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.ageAnalysis.average} yrs
                                    </TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-none hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Youngest</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.ageAnalysis.low} yrs
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Gender Analysis(in count)</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableBody>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Male</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.genderRatio.male}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Female</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.genderRatio.female}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Trans</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.genderRatio.trans}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="grid grid-cols-12 border-none hover:bg-zinc-900/30 transition-colors">
                                    <TableCell className="col-span-8 pl-6 text-zinc-400 font-medium">Others</TableCell>
                                    <TableCell className="col-span-4 pr-6 text-right text-white ">
                                        {analytics.genderRatio.preferNotToSay}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

			<Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="">
                    <CardTitle className="text-sm font-bold text-white  ">Maximum Traveller Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="border-b border-zinc-900 hover:bg-transparent">
                                    <TableHead className="w-[10%] text-left font-bold text-zinc-500  text-[10px] ">#</TableHead>
                                    <TableHead className="w-[35%] text-left font-bold text-zinc-500  text-[10px] ">City, State, Country</TableHead>
                                    <TableHead className="w-[15%] text-left font-bold text-zinc-500  text-[10px] ">Age Group</TableHead>
                                    <TableHead className="w-[20%] text-left font-bold text-zinc-500  text-[10px] ">Gender Ratio</TableHead>
                                    <TableHead className="w-[20%] text-right font-bold text-zinc-500  text-[10px] ">Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {analytics.maxTravellerTraffic.map((t) => (
                                    <TableRow key={t.rank} className="hover:bg-zinc-900/50 transition-colors border-zinc-900">
                                        <TableCell className="text-left py-4  text-[10px] text-zinc-500">
                                            {t.rank}
                                        </TableCell>
                                        <TableCell className="text-left py-4 font-bold text-zinc-200">
                                            {`${t.city}, ${t.state}, ${t.country}`}
                                        </TableCell>
                                        <TableCell className="text-left py-4 text-zinc-400 text-sm">
                                            {t.ageGroup}
                                        </TableCell>
                                        <TableCell className="text-left py-4 text-zinc-400 text-sm">
                                            {t.genderRatio}
                                        </TableCell>
                                        <TableCell className="text-right py-4 font-bold text-white ">
                                            {t.count}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
		</div>
	);
}
