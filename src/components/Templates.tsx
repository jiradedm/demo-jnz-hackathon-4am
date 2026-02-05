import { useState } from 'react'
import { DashboardLayout } from './DashboardLayout'
import {
  FileText,
  Upload,
  MoreVertical,
  Plus,
  Loader2,
  Eye,
  Download,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Template {
  id: string
  title: string
  description: string
  category: string
  uploadDate: string
  size: string
  thumbnail: string
}

const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    title: 'Startup Pitch Deck',
    description: 'Standard 10-slide pitch deck for early stage startups',
    category: 'Business',
    uploadDate: '2024-02-01',
    size: '2.4 MB',
    thumbnail:
      'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40',
  },
  {
    id: '2',
    title: 'Minimalist Portfolio',
    description: 'Clean and simple portfolio template for creatives',
    category: 'Creative',
    uploadDate: '2024-01-28',
    size: '1.8 MB',
    thumbnail:
      'bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/40 dark:to-orange-900/40',
  },
  {
    id: '3',
    title: 'Corporate Report',
    description: 'Professional quarterly report template',
    category: 'Corporate',
    uploadDate: '2024-01-15',
    size: '3.1 MB',
    thumbnail:
      'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
  },
]

export function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [newTemplateName, setNewTemplateName] = useState('')
  const [newTemplateDescription, setNewTemplateDescription] = useState('')
  const [newTemplateCategory, setNewTemplateCategory] = useState('Business')
  const [selectedFile, setSelectedFile] = useState<{
    name: string
    size: number
  } | null>(null)
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false)

  const handleMockFileSelect = () => {
    if (isUploading || isSimulatingUpload) return

    setIsSimulatingUpload(true)

    // Simulate a brief delay for "selected" state
    setTimeout(() => {
      setSelectedFile({
        name: 'Modern_Pitch_Deck_Template.pptx',
        size: 4.5 * 1024 * 1024, // 4.5 MB
      })

      if (!newTemplateName) {
        setNewTemplateName('Modern Pitch Deck Template')
      }
      if (!newTemplateDescription) {
        setNewTemplateDescription(
          'Professional template for high-growth startups with modern aesthetics.'
        )
      }
      setIsSimulatingUpload(false)
    }, 1000)
  }

  const handleUpload = () => {
    if (!selectedFile || !newTemplateName) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Finish upload after simulate time
    setTimeout(() => {
      clearInterval(interval)
      const newTemplate: Template = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTemplateName,
        description: newTemplateDescription || 'Custom uploaded template',
        category: newTemplateCategory,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        thumbnail:
          'bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800',
      }

      setTemplates([newTemplate, ...templates])
      setIsUploading(false)
      setIsDialogOpen(false)
      setNewTemplateName('')
      setNewTemplateDescription('')
      setNewTemplateCategory('Business')
      setSelectedFile(null)
      setUploadProgress(0)
    }, 2500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-thai font-bold text-3xl text-slate-900 dark:text-slate-100 tracking-tight">
              เทมเพลต (Templates)
            </h1>
            <p className="font-thai text-slate-500 dark:text-slate-400 mt-1">
              จัดการและรวบรวมเทมเพลตสำหรับงานนำเสนอของคุณ
            </p>
          </div>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="font-thai gap-2 bg-winitch-600 hover:bg-winitch-700 shadow-lg shadow-winitch-500/20"
          >
            <Upload className="h-4 w-4" />
            Upload Template
          </Button>
        </div>

        {/* Custom Modal */}
        {isDialogOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={() => !isUploading && setIsDialogOpen(false)}
          >
            <div
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-thai text-slate-900 dark:text-white">
                    Upload New Template
                  </h3>
                  <p className="text-xs text-slate-500 font-thai mt-1">
                    เลือกไฟล์ Template ที่ต้องการอัพโหลด (รองรับ .pptx, .pdf)
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-thai">
                    Template Name
                  </Label>
                  <Input
                    id="name"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Enter template name..."
                    className="font-thai"
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-thai">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={newTemplateCategory}
                    onChange={(e) => setNewTemplateCategory(e.target.value)}
                    disabled={isUploading}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 font-thai"
                  >
                    <option value="Business">Business</option>
                    <option value="Creative">Creative</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Education">Education</option>
                    <option value="Technology">Technology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-thai">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newTemplateDescription}
                    onChange={(e) => setNewTemplateDescription(e.target.value)}
                    placeholder="Enter template description..."
                    className="font-thai resize-none"
                    rows={3}
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file" className="font-thai">
                    File
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <div
                      onClick={handleMockFileSelect}
                      className={cn(
                        'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700 transition-colors',
                        (isUploading || isSimulatingUpload) &&
                          'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isSimulatingUpload ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="w-8 h-8 mb-2 text-winitch-500 animate-spin" />
                            <p className="font-thai text-sm font-medium text-winitch-600">
                              กำลังอัพโหลด...
                            </p>
                          </div>
                        ) : selectedFile ? (
                          <>
                            <FileText className="w-8 h-8 mb-2 text-winitch-500" />
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center px-4 line-clamp-1">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{' '}
                              MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-2 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400 text-center">
                              <span className="font-semibold">
                                Click to simulate upload
                              </span>
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              PPTX, PDF (Mock Simulation)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 font-thai">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-winitch-600 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  onClick={handleUpload}
                  disabled={!selectedFile || !newTemplateName || isUploading}
                  className="font-thai w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Save Template'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Template Card (Optional shortcut) */}
          <div
            onClick={() => setIsDialogOpen(true)}
            className="group cursor-pointer relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent p-6 hover:border-winitch-500 hover:bg-winitch-50/50 dark:hover:border-winitch-500/50 dark:hover:bg-winitch-950/20 transition-all duration-200 min-h-[280px]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-winitch-100 dark:group-hover:bg-winitch-900/50 transition-colors">
              <Plus className="h-8 w-8 text-slate-400 group-hover:text-winitch-600 dark:group-hover:text-winitch-400" />
            </div>
            <h3 className="font-thai font-semibold text-slate-900 dark:text-white group-hover:text-winitch-700 dark:group-hover:text-winitch-300">
              New Template
            </h3>
          </div>

          {templates.map((template) => (
            <Card
              key={template.id}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-200 min-h-[280px] flex flex-col"
            >
              <div
                className={cn(
                  'relative h-32 w-full shrink-0',
                  template.thumbnail
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[1px]">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
                  >
                    <Eye className="h-4 w-4 text-slate-700" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
                  >
                    <Download className="h-4 w-4 text-slate-700" />
                  </Button>
                </div>
              </div>

              <CardContent className="flex-1 flex flex-col p-4">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 mb-2 font-thai">
                        {template.category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mr-2 text-slate-400"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <h3 className="font-thai font-bold text-base text-slate-900 dark:text-white line-clamp-2 mb-1 leading-snug">
                    {template.title}
                  </h3>
                  <p className="font-thai text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs text-slate-400 font-thai">
                  <span>{template.uploadDate}</span>
                  <span>{template.size}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
