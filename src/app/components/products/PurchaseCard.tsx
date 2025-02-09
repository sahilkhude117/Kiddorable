'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import { Eye, EyeOff, ShoppingCart } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import useSWR from 'swr';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Props {
  price: number;
  originalPrice: number;
  discountPercentage: number;
  productId: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  purchases: {
    id: string;
    product: {
      id: string;
      title: string;
      thumbnailImage: string;
      driveLink: string;
    };
  }[];
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const PurchaseCard = ({
  price,
  originalPrice,
  discountPercentage,
  productId,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(''); 
  const [hiddenPassword, setHiddenPassword] = useState(true);  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { data: session, status } = useSession();
  const [loginerror, setLoginError] = useState('');

  // Fetch user info using SWR only if the user is authenticated
  const { data: userInfo, error, isLoading } = useSWR<UserInfo>(
    status === 'authenticated' ? '/api/user' : null,
    (url: string) => axios.get(url).then((res) => res.data.userInfo)
  );

  // Check if the user has already purchased the product
  const checkIfAlreadyPurchased = () => {
    return userInfo?.purchases.some((purchase) => purchase.product.id === productId);
  };

  const toggleVisibility = () => {
    setHiddenPassword(!hiddenPassword);
  }

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!emailRegex.test(email)){
        setLoginError('Invalid email address');
        setLoading(false);
        return;
    }

    if(!passwordRegex.test(password)){
        setLoginError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        setLoading(false);
        return;
    }

    try {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            name: {email},
        });

        if(result?.error){
            setLoginError('Invalid email or password');
            setLoading(false);
            return;
        } else {
            window.location.reload();
        }
    } catch (err) {
        setLoginError('Something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
 }

  // Load Razorpay script dynamically
  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }
      document.body.appendChild(script);
    })
  }, []);

  // Handle payment button click
  const handleClick = async () => {
    setLoading(true);

    try {
      if (!session && (!email || !name)) {
        alert('Please provide your email and name');
        setLoading(false);
        return;
      }

      // Check if the user has already purchased the product
      if (checkIfAlreadyPurchased()) {
        router.push('/cart');
        return;
      }

      // Proceed with payment
      await onBuy();
    } catch (error) {
      console.error('Failed to buy product', error);
      alert('Failed to buy product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create Razorpay order
  const onBuy = async () => {
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        throw new Error('Razorpay script failed to load');
      }

      const response = await axios.post('/api/payment/create-order', {
        amount: price,
        currency: 'INR',
        receipt: `order_${Date.now()}`,
        userId: userInfo?.id || null,
        email: userInfo?.email || email,
        name: userInfo?.name || name,
        productId,
      });

      const order = response.data.order;
      await handlePurchase(order);
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('An error occurred while processing your request. Please try again.');
    }
  };

  // Handle Razorpay payment
  const handlePurchase = useCallback(
    async (order: any) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: 'INR',
        name: 'Kiddorable',
        description: 'Product Purchase',
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          const payload = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const verify = await axios.post('/api/payment/verify-order', payload, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (verify.data.success) {
              window.location.href = '/cart';
            } else {
              alert('Payment failed');
            }
          } catch (e) {
            console.error('Payment verification failed', e);
            alert('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: session?.user?.name || name,
          email: session?.user?.email || email,
        },
      };

      // @ts-ignore
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    },
    [session, email, name]
  );

  // Conditional rendering based on authentication status
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="mt-4 fixed bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className='max-w-2xl mx-auto'>
          <CardHeader className="pl-6 pb-2 pt-2">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-xs">Amount Total</div>
                <div className="text-xl font-bold">₹{price}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            
            <Dialog>
            <DialogTrigger asChild className='w-full'>
                <Button
                    className="w-full py-6 text-lg font-semibold"
                    disabled={loading}
                >
                <ShoppingCart className="mr-2 h-4 w-4" />
                    {loading ? <PulseLoader color="#fff" size={12} /> : 'Login'}
                </Button>
            </DialogTrigger>
            <DialogContent className="text-black bg-white max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className='text-black'>You are not logged in</DialogTitle>
                    <DialogDescription> Log in to your account</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

            {/* Email Field */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Email
                </Label>
                <Input 
                    id="email" 
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="@peduarte" 
                    value={email}
                    onChange={(e) => {
                        setLoginError("")
                        setEmail(e.target.value)
                    }}
                    className="col-span-3" />
            </div>
            {/* Password Field */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                    Password
                </Label>
                <Input 
                    id="password" 
                    name="password"
                    type= {hiddenPassword ? "password" : "text"}
                    autoComplete="password"
                    required
                    placeholder="mypassword" 
                    value={password}
                    onChange={(e) => {
                        setLoginError('')
                        setPassword(e.target.value)
                    }}
                    className="col-span-3 pr-10" 
                />
                <div
                    onClick={toggleVisibility}
                    className="absolute right-8 top-3/2 cursor-pointer"
                >
                    {hiddenPassword ? <EyeOff/> : <Eye/> }
                </div>
            </div>
            </div>

            {/* Error Message */}
            {loginerror && (
                <div className="text-red-500 text-sm text-center">
                    {loginerror}
                </div>
            )}

            <DialogFooter>
            <Button type="submit"
                    disabled={loading}
                    className="w-full py-6 text-lg font-semibold"
                    onClick={handleLogin}
            >
                        {loading ? (
                            <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                            "Login" 
                        )}
            </Button>
            </DialogFooter>
            </DialogContent>
          </Dialog>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading user information...</p>
      </div>
    );
  }

  if (error || !userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Failed to load user information.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 fixed bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className='max-w-2xl mx-auto'>
        <CardHeader className="pl-6 pb-2 pt-2">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-3xl font-bold">₹{price}</div>
                  <div className='flex justify-center '>
                    <div className="text-sm text-gray-500 line-through mr-2">₹{originalPrice}</div>
                    <Badge className="bg-green-100 text-green-800">
                    {discountPercentage}% OFF
                    </Badge>
                  </div>
                  
                </div>
              </div>
        </CardHeader>
        <CardContent className="space-y-1">

          {/* Dialogue  */}
          <Button
              className="w-full py-6 text-lg font-semibold"
              onClick={handleClick}
              disabled={loading}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {loading ? <PulseLoader color="#fff" size={12} /> : 'Make Payment'}
            </Button>

        </CardContent>
      </Card>
    </div>
  );
};
