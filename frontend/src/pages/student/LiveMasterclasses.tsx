import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Play, 
  Bell,
  CheckCircle,
  XCircle,
  Loader2,
  Star,
  BookOpen
} from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  instructor_name: string;
  instructor_avatar: string;
  scheduled_time: string;
  duration: number;
  max_participants: number;
  current_participants: number;
  category: string;
  level: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  meeting_url: string | null;
  recording_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  class_id: string;
  enrolled_at: string;
  attended: boolean;
  rating: number | null;
  feedback: string | null;
}

export default function LiveMasterclasses() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all');

  useEffect(() => {
    loadClasses();
    loadEnrollments();
  }, [user, filter]);

  const loadClasses = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('live_classes')
        .select('*')
        .order('scheduled_time', { ascending: true });

      if (filter === 'upcoming') {
        query = query.eq('status', 'upcoming');
      } else if (filter === 'live') {
        query = query.eq('status', 'live');
      } else if (filter === 'completed') {
        query = query.eq('status', 'completed');
      }

      const { data, error } = await query;

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrollments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    }
  };

  const isEnrolled = (classId: string) => {
    return enrollments.some(e => e.class_id === classId);
  };

  const handleEnroll = async (classId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          class_id: classId,
          enrolled_at: new Date().toISOString(),
          attended: false
        });

      if (error) throw error;

      await loadEnrollments();
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const handleUnenroll = async (classId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('user_id', user.id)
        .eq('class_id', classId);

      if (error) throw error;

      await loadEnrollments();
    } catch (error) {
      console.error('Error unenrolling:', error);
    }
  };

  const handleJoinClass = (meetingUrl: string) => {
    if (meetingUrl) {
      window.open(meetingUrl, '_blank');
    }
  };

  const handleWatchRecording = (recordingUrl: string) => {
    if (recordingUrl) {
      window.open(recordingUrl, '_blank');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = date.getTime() - now.getTime();

    if (diff < 0) return 'Started';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} left`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    }

    return `${minutes}m left`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 animate-pulse">LIVE NOW</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Live Masterclasses
            </h1>
            <p className="text-gray-600">
              Join interactive live sessions with expert instructors
            </p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'default' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'live' ? 'default' : 'outline'}
              onClick={() => setFilter('live')}
            >
              Live Now
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Recordings
            </Button>
          </div>
        </div>

        {classes.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BookOpen className="text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">
                No classes available at the moment
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back later for new masterclasses
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((liveClass, index) => (
              <motion.div
                key={liveClass.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {liveClass.thumbnail_url && (
                    <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
                      <img
                        src={liveClass.thumbnail_url}
                        alt={liveClass.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(liveClass.status)}
                      </div>
                      {liveClass.status === 'live' && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Live
                        </div>
                      )}
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{liveClass.category}</Badge>
                      <Badge variant="outline">{liveClass.level}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{liveClass.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {liveClass.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={liveClass.instructor_avatar} />
                        <AvatarFallback>
                          {liveClass.instructor_name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{liveClass.instructor_name}</p>
                        <p className="text-xs text-gray-500">Instructor</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{formatTime(liveClass.scheduled_time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{liveClass.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>
                          {liveClass.current_participants}/{liveClass.max_participants} enrolled
                        </span>
                      </div>
                      {liveClass.status === 'upcoming' && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                          <Bell size={16} />
                          <span>{getTimeUntil(liveClass.scheduled_time)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {liveClass.status === 'live' && isEnrolled(liveClass.id) && liveClass.meeting_url ? (
                        <Button
                          onClick={() => handleJoinClass(liveClass.meeting_url!)}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          <Play className="mr-2" size={16} />
                          Join Live
                        </Button>
                      ) : liveClass.status === 'completed' && liveClass.recording_url ? (
                        <Button
                          onClick={() => handleWatchRecording(liveClass.recording_url)}
                          className="flex-1"
                        >
                          <Video className="mr-2" size={16} />
                          Watch Recording
                        </Button>
                      ) : liveClass.status === 'upcoming' ? (
                        isEnrolled(liveClass.id) ? (
                          <Button
                            onClick={() => handleUnenroll(liveClass.id)}
                            variant="outline"
                            className="flex-1"
                          >
                            <XCircle className="mr-2" size={16} />
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleEnroll(liveClass.id)}
                            className="flex-1"
                            disabled={liveClass.current_participants >= liveClass.max_participants}
                          >
                            <CheckCircle className="mr-2" size={16} />
                            {liveClass.current_participants >= liveClass.max_participants 
                              ? 'Full' 
                              : 'Enroll Now'}
                          </Button>
                        )
                      ) : (
                        <Button disabled className="flex-1">
                          {liveClass.status === 'cancelled' ? 'Cancelled' : 'Not Available'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
