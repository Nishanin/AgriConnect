import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard, Wallet, Building, Smartphone, Check, Clock,
  Download, Filter, Search, Calendar, TrendingUp, IndianRupee,
  ArrowUpRight, ArrowDownRight, CheckCircle, XCircle, AlertCircle,
  Eye, MoreVertical, RefreshCw, Shield, Lock, Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { Label } from './ui/label';

export default function Payments({ user, language }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [paymentPurpose, setPaymentPurpose] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const translations = {
    en: {
      payments: 'Payments',
      overview: 'Overview',
      transactions: 'Transactions',
      paymentMethods: 'Payment Methods',
      makePayment: 'Make Payment',
      totalEarnings: 'Total Earnings',
      totalSpent: 'Total Spent',
      pendingPayments: 'Pending Payments',
      thisMonth: 'This Month',
      recentTransactions: 'Recent Transactions',
      all: 'All',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      amount: 'Amount',
      date: 'Date',
      status: 'Status',
      type: 'Type',
      viewDetails: 'View Details',
      download: 'Download',
      filter: 'Filter',
      search: 'Search transactions...',
      addPaymentMethod: 'Add Payment Method',
      upi: 'UPI',
      card: 'Credit/Debit Card',
      netBanking: 'Net Banking',
      wallet: 'Wallet',
      setAsDefault: 'Set as Default',
      remove: 'Remove',
      enterAmount: 'Enter Amount',
      selectMethod: 'Select Payment Method',
      proceedToPay: 'Proceed to Pay',
      cancel: 'Cancel',
      income: 'Income',
      expense: 'Expense',
      withdraw: 'Withdraw',
      deposit: 'Deposit',
    },
    hi: {
      payments: 'भुगतान',
      overview: 'अवलोकन',
      transactions: 'लेनदेन',
      paymentMethods: 'भुगतान विधियां',
      makePayment: 'भुगतान करें',
      totalEarnings: 'कुल आय',
      totalSpent: 'कुल खर्च',
      pendingPayments: 'लंबित भुगतान',
      thisMonth: 'इस महीने',
      recentTransactions: 'हाल के लेनदेन',
      all: 'सभी',
      completed: 'पूर्ण',
      pending: 'लंबित',
      failed: 'विफल',
      amount: 'राशि',
      date: 'तारीख',
      status: 'स्थिति',
      type: 'प्रकार',
      viewDetails: 'विवरण देखें',
      download: 'डाउनलोड करें',
      filter: 'फ़िल्टर',
      search: 'लेनदेन खोजें...',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const stats = [
    {
      title: t('totalEarnings'),
      value: '₹1,24,850',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('totalSpent'),
      value: '₹45,230',
      change: '+8.2%',
      trend: 'up',
      icon: ArrowUpRight,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('pendingPayments'),
      value: '₹12,450',
      change: '3 pending',
      trend: 'neutral',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const transactions = [
    {
      id: 'TXN001',
      type: 'income',
      description: 'Sale of Tomatoes - 50kg',
      amount: 2250,
      date: '2025-12-03',
      status: 'completed',
      method: 'UPI',
      buyer: 'Amit Traders',
    },
    {
      id: 'TXN002',
      type: 'expense',
      description: 'Purchase of Seeds',
      amount: 1500,
      date: '2025-12-02',
      status: 'completed',
      method: 'Card',
      seller: 'AgriMart',
    },
    {
      id: 'TXN003',
      type: 'income',
      description: 'Sale of Wheat - 100kg',
      amount: 2800,
      date: '2025-12-01',
      status: 'pending',
      method: 'Net Banking',
      buyer: 'Food Corp India',
    },
    {
      id: 'TXN004',
      type: 'expense',
      description: 'Fertilizer Purchase',
      amount: 3500,
      date: '2025-11-30',
      status: 'completed',
      method: 'UPI',
      seller: 'Agro Store',
    },
    {
      id: 'TXN005',
      type: 'income',
      description: 'Sale of Onions - 75kg',
      amount: 2625,
      date: '2025-11-29',
      status: 'failed',
      method: 'Card',
      buyer: 'Fresh Market',
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'upi',
      name: 'PhonePe',
      identifier: 'farmer@paytm',
      icon: Smartphone,
      isDefault: true,
    },
    {
      id: 2,
      type: 'card',
      name: 'HDFC Debit Card',
      identifier: '**** **** **** 4532',
      icon: CreditCard,
      isDefault: false,
    },
    {
      id: 3,
      type: 'bank',
      name: 'State Bank of India',
      identifier: 'SBIN0001234',
      icon: Building,
      isDefault: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return AlertCircle;
      case 'failed':
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center">
              <Wallet className="w-9 h-9 mr-3 text-blue-600" />
              {t('payments')}
            </h1>
            <p className="text-gray-600 mt-2 text-sm lg:text-base">
              Manage your transactions and payment methods
            </p>
          </div>
          <Button
            onClick={() => setPaymentModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
          >
            <IndianRupee className="w-4 h-4 mr-2" />
            {t('makePayment')}
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1 font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : stat.trend === 'down' ? (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      ) : null}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white shadow-xl border-0">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
                <TabsTrigger value="transactions">{t('transactions')}</TabsTrigger>
                <TabsTrigger value="methods">{t('paymentMethods')}</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{t('recentTransactions')}</h3>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {t('download')}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((txn, index) => {
                      const StatusIcon = getStatusIcon(txn.status);
                      return (
                        <motion.div
                          key={txn.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              <div className={`p-3 rounded-full ${txn.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {txn.type === 'income' ? (
                                  <ArrowDownRight className={`w-5 h-5 text-green-600`} />
                                ) : (
                                  <ArrowUpRight className={`w-5 h-5 text-red-600`} />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-gray-900">{txn.description}</p>
                                  <Badge className={getStatusColor(txn.status) + ' text-xs'}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {t(txn.status)}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                  <span>{txn.id}</span>
                                  <span>•</span>
                                  <span>{txn.date}</span>
                                  <span>•</span>
                                  <span>{txn.method}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                              </p>
                              <Button variant="ghost" size="sm" className="mt-1">
                                <Eye className="w-4 h-4 mr-1" />
                                {t('viewDetails')}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={t('search')}
                      className="pl-10"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder={t('filter')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all')}</SelectItem>
                      <SelectItem value="completed">{t('completed')}</SelectItem>
                      <SelectItem value="pending">{t('pending')}</SelectItem>
                      <SelectItem value="failed">{t('failed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                        <th className="text-left p-4 font-semibold text-gray-700">{t('date')}</th>
                        <th className="text-left p-4 font-semibold text-gray-700">{t('amount')}</th>
                        <th className="text-left p-4 font-semibold text-gray-700">{t('status')}</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => {
                        const StatusIcon = getStatusIcon(txn.status);
                        return (
                          <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 font-mono text-sm">{txn.id}</td>
                            <td className="p-4">
                              <p className="font-medium text-gray-900">{txn.description}</p>
                              <p className="text-sm text-gray-600">{txn.method}</p>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{txn.date}</td>
                            <td className="p-4">
                              <span className={`font-bold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(txn.status)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {t(txn.status)}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="methods" className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Saved Payment Methods</h3>
                  <Button variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t('addPaymentMethod')}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 border-2 hover:border-blue-300 transition-colors relative">
                        {method.isDefault && (
                          <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                            Default
                          </Badge>
                        )}
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-blue-50 rounded-full">
                            <method.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{method.identifier}</p>
                            <div className="flex space-x-2">
                              {!method.isDefault && (
                                <Button variant="outline" size="sm">
                                  {t('setAsDefault')}
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="text-red-600">
                                {t('remove')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        {/* Payment Modal */}
        <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t('makePayment')}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-2">Complete your payment securely and quickly</p>
            </DialogHeader>

            {!showConfirmation ? (
              <div className="space-y-6 mt-4">
                {/* Payment Details Section */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-blue-600" />
                    Payment Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2 block">
                        Amount <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="pl-10 h-12 text-lg font-semibold border-2 focus:border-blue-500"
                        />
                      </div>
                      {paymentAmount && (
                        <p className="text-xs text-gray-500 mt-1">
                          In words: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(paymentAmount)}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="purpose" className="text-sm font-medium text-gray-700 mb-2 block">
                        Payment Purpose <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="purpose"
                        value={paymentPurpose}
                        onChange={(e) => setPaymentPurpose(e.target.value)}
                        className="w-full h-12 px-3 border-2 rounded-md focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select purpose</option>
                        <option value="product">Product Purchase</option>
                        <option value="service">Service Payment</option>
                        <option value="subscription">Subscription Renewal</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="note" className="text-sm font-medium text-gray-700 mb-2 block">
                      Add Note (Optional)
                    </Label>
                    <textarea
                      id="note"
                      value={paymentNote}
                      onChange={(e) => setPaymentNote(e.target.value)}
                      placeholder="Add any additional details..."
                      className="w-full px-3 py-2 border-2 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                      rows="2"
                    />
                  </div>
                </div>

                {/* Payment Method Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Select Payment Method
                  </h3>
                  
                  <div className="space-y-3">
                    {/* UPI Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod('upi')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedMethod === 'upi'
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === 'upi' ? 'border-blue-500' : 'border-gray-300'
                          }`}>
                            {selectedMethod === 'upi' && (
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">UPI Payment</p>
                            <p className="text-sm text-gray-500">Pay using any UPI app • Instant</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            Recommended
                          </Badge>
                          <Smartphone className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      {selectedMethod === 'upi' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-blue-200"
                        >
                          <Input
                            placeholder="Enter UPI ID (e.g., name@upi)"
                            className="border-blue-300 focus:border-blue-500"
                          />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Card Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod('card')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedMethod === 'card'
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === 'card' ? 'border-blue-500' : 'border-gray-300'
                          }`}>
                            {selectedMethod === 'card' && (
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Visa, Mastercard, RuPay • 2-3 mins</p>
                          </div>
                        </div>
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                    </motion.div>

                    {/* Bank Transfer Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod('bank')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedMethod === 'bank'
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === 'bank' ? 'border-blue-500' : 'border-gray-300'
                          }`}>
                            {selectedMethod === 'bank' && (
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Net Banking</p>
                            <p className="text-sm text-gray-500">Pay via your bank • 5-10 mins</p>
                          </div>
                        </div>
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Transaction Summary */}
                {paymentAmount && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">Transaction Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-semibold">₹{parseFloat(paymentAmount).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-semibold text-green-600">₹0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST (18%)</span>
                        <span className="font-semibold">₹{(parseFloat(paymentAmount) * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between text-base">
                          <span className="font-bold text-gray-900">Total Amount</span>
                          <span className="font-bold text-blue-600">
                            ₹{(parseFloat(paymentAmount) * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">Secure Payment:</span> All transactions are encrypted with 256-bit SSL security
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setPaymentModalOpen(false)}
                    className="flex-1 h-12 border-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (paymentAmount && paymentPurpose) {
                        setShowConfirmation(true);
                      }
                    }}
                    disabled={!paymentAmount || !paymentPurpose}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Proceed to Pay ₹{paymentAmount ? (parseFloat(paymentAmount) * 1.18).toFixed(2) : '0.00'}
                  </Button>
                </div>
              </div>
            ) : (
              /* Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Initiated!</h3>
                <p className="text-gray-600 mb-6">
                  Processing your payment of ₹{paymentAmount ? (parseFloat(paymentAmount) * 1.18).toFixed(2) : '0.00'}
                </p>

                <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">Transaction Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono font-semibold">TXN{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-semibold capitalize">{selectedMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purpose:</span>
                      <span className="font-semibold capitalize">{paymentPurpose.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Processing</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowConfirmation(false);
                      setPaymentModalOpen(false);
                      setPaymentAmount('');
                      setPaymentPurpose('');
                      setPaymentNote('');
                    }}
                    className="flex-1 h-12"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowConfirmation(false);
                      setPaymentModalOpen(false);
                      setPaymentAmount('');
                      setPaymentPurpose('');
                      setPaymentNote('');
                    }}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
