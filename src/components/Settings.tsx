import { User, Bell, Lock, Palette, Globe, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { DashboardLayout } from './DashboardLayout'

export function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-thai font-bold text-3xl text-slate-900 dark:text-slate-100 tracking-tight">
            Settings
          </h1>
          <p className="font-thai text-slate-500 dark:text-slate-400 mt-1">
            จัดการข้อมูลส่วนตัวและการตั้งค่าแอพพลิเคชั่น
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Settings Navigation */}
          <nav className="space-y-1">
            <Button
              variant="secondary"
              className="w-full justify-start gap-3 font-thai font-medium"
            >
              <User className="h-4 w-4" />
              General
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-thai text-slate-600 dark:text-slate-400 font-medium"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-thai text-slate-600 dark:text-slate-400 font-medium"
            >
              <Palette className="h-4 w-4" />
              Appearance
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-thai text-slate-600 dark:text-slate-400 font-medium"
            >
              <Globe className="h-4 w-4" />
              Language
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-thai text-slate-600 dark:text-slate-400 font-medium"
            >
              <Lock className="h-4 w-4" />
              Security
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-thai text-slate-600 dark:text-slate-400 font-medium"
            >
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
          </nav>

          {/* Settings Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-thai">Profile Information</CardTitle>
                <CardDescription className="font-thai">
                  ข้อมูลส่วนตัวที่จะแสดงบนโปรไฟล์ของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300">
                    JS
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="font-thai">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-thai">First name</Label>
                    <Input defaultValue="Jenosize" className="font-thai" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-thai">Last name</Label>
                    <Input defaultValue="User" className="font-thai" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-thai">Email</Label>
                  <Input
                    defaultValue="user@jenosize.com"
                    readOnly
                    className="font-thai bg-slate-50 dark:bg-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-thai">Bio</Label>
                  {/* Reuse Textarea from ui or just basic input for now */}
                  <Input
                    defaultValue="Agentic AI Enthusiast"
                    className="font-thai"
                  />
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex justify-end">
                <Button className="font-thai gap-2 bg-winitch-600 hover:bg-winitch-700">
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-thai">Preferences</CardTitle>
                <CardDescription className="font-thai">
                  ตั้งค่าการใช้งานทั่วไป
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium font-thai">Email Notifications</p>
                    <p className="text-sm text-slate-500 font-thai">
                      รับข่าวสารและการแจ้งเตือนผ่านอีเมล
                    </p>
                  </div>
                  {/* Simplified switch toggle */}
                  <div className="h-6 w-11 rounded-full bg-winitch-600 relative cursor-pointer">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
