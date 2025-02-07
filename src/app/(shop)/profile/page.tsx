// app/(shop)/profile/page.tsx
import { User, Shield, Download, Star, Clock, Settings, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface UserInfo {
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

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);
        setUserInfo(response.data.userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchUserInfo();
    }
  }, [status]);

  if (status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">You are not logged in.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No user information available.</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Profile Header */}
      <header className="bg-[#F8F9FA] px-4 py-6" aria-labelledby="profile-header">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="bg-[#2A5C8F] text-white p-3 rounded-full">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 id="profile-header" className="text-xl font-bold text-[#2A5C8F]">
              {userInfo.name}
            </h1>
            <p className="text-[#6B7280] text-sm">{userInfo.email}</p>
            <Badge className="mt-1 bg-[#FFD700] text-[#2A5C8F] hover:bg-[#FFD700]/90">
              Premium Member
            </Badge>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="px-4 mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-[#34C759]" />
            <div>
              <p className="text-[#6B7280] text-sm">Downloads</p>
              <p className="text-xl font-bold text-[#2A5C8F]">{userInfo.purchases.length}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-[#FFD700]" />
            <div>
              <p className="text-[#6B7280] text-sm">Member Since</p>
              <p className="text-xl font-bold text-[#2A5C8F]">
                {new Date(userInfo.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Status */}
      <section className="px-4 mt-6">
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#34C759]" />
              <div>
                <h3 className="font-semibold text-[#2A5C8F]">Account Security</h3>
                <p className="text-sm text-[#6B7280]">2FA Enabled • Email Verified</p>
              </div>
            </div>
            <Button variant="outline" className="border-[#2A5C8F] text-[#2A5C8F]">
              Manage
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 mt-6 grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center border-[#2A5C8F]/20"
        >
          <CreditCard className="w-6 h-6 text-[#2A5C8F] mb-2" />
          <span className="text-[#2A5C8F]">Payment Methods</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center border-[#2A5C8F]/20"
        >
          <Settings className="w-6 h-6 text-[#2A5C8F] mb-2" />
          <span className="text-[#2A5C8F]">Account Settings</span>
        </Button>
      </section>

      {/* Recent Purchases */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2A5C8F]">Recent Purchases</h2>
          <Button variant="link" className="text-[#34C759]">
            View All
          </Button>
        </div>
        {/* Uncomment and implement HorizontalScrollProducts if needed */}
        {/* <HorizontalScrollProducts products={userInfo.purchases.map(p => p.product)} /> */}
      </section>

      {/* Recommendations */}
      <section className="px-4 mt-8">
        <h2 className="text-lg font-bold text-[#2A5C8F] mb-4">Recommended for You</h2>
        {/* Uncomment and implement HorizontalScrollProducts if needed */}
        {/* <HorizontalScrollProducts products={[]} /> */}
      </section>

      {/* Sticky Upgrade Banner */}
      {/* Uncomment and implement membership logic if needed */}
      {/* {membership === "Free" && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#FFD700] to-[#FFB700] p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#2A5C8F]">Upgrade to Premium</h3>
              <p className="text-sm text-[#2A5C8F]">Unlock exclusive resources</p>
            </div>
            <Button className="bg-[#2A5C8F] hover:bg-[#1E456E]">
              Upgrade Now
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
}