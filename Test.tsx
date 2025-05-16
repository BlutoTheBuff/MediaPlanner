import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { Trash, Edit, Check, X } from "lucide-react"

type Task = {
  id: string
  title: string
  description: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const addTask = () => {
    if (!title.trim()) return
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim()
    }
    
    setTasks([...tasks, newTask])
    setTitle('')
    setDescription('')
  }

  const updateTask = () => {
    if (!editingId || !title.trim()) return
    
    setTasks(tasks.map(task => 
      task.id === editingId 
        ? { ...task, title: title.trim(), description: description.trim() }
        : task
    ))
    
    setEditingId(null)
    setTitle('')
    setDescription('')
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditing = (task: Task) => {
    setEditingId(task.id)
    setTitle(task.title)
    setDescription(task.description)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {editingId ? 'Edit Task' : 'Add New Task'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              {editingId ? (
                <>
                  <Button onClick={updateTask} className="flex items-center gap-1">
                    <Check className="h-4 w-4" /> Update
                  </Button>
                  <Button variant="outline" onClick={cancelEditing} className="flex items-center gap-1">
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={addTask}>Add Task</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {tasks.length > 0 && (
        <Card className="max-w-2xl mx-auto mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your Tasks</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {tasks.map(task => (
              <Card key={task.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => startEditing(task)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteTask(task.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
