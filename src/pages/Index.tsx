import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedSection, setSelectedSection] = useState('feed');
  const [newPostText, setNewPostText] = useState('');
  const [commentTexts, setCommentTexts] = useState<{[key: number]: string}>({});
  const [showComments, setShowComments] = useState<{[key: number]: boolean}>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('Ваш профиль');
  const [isVerified, setIsVerified] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUserName, setEditUserName] = useState(userName);
  const [adminSection, setAdminSection] = useState('dashboard');
  const [adminMessage, setAdminMessage] = useState('');

  const [users, setUsers] = useState([
    { id: 1, name: 'Алексей Петров', email: 'alex@example.com', verified: false, status: 'active', posts: 23 },
    { id: 2, name: 'Мария Иванова', email: 'maria@example.com', verified: true, status: 'active', posts: 45 },
    { id: 3, name: 'Дмитрий Смирнов', email: 'dmitry@example.com', verified: false, status: 'banned', posts: 12 },
    { id: 4, name: 'Анна Козлова', email: 'anna@example.com', verified: true, status: 'active', posts: 67 },
  ]);

  const [reports, setReports] = useState([
    { id: 1, type: 'Спам', content: 'Пост содержит рекламу', reporter: 'Пользователь123', status: 'pending' },
    { id: 2, type: 'Оскорбления', content: 'Неподобающие комментарии', reporter: 'Модератор1', status: 'resolved' },
    { id: 3, type: 'Фейк', content: 'Ложная информация', reporter: 'Пользователь456', status: 'pending' },
  ]);

  const initialPosts = [
    {
      id: 1,
      author: 'Алексей Петров',
      avatar: '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg',
      time: '2 часа назад',
      content: 'Какой невероятный закат сегодня! Природа никогда не перестает удивлять своей красотой 🌅',
      image: '/img/316f1f0b-7f70-4905-98f6-4ac4f242a329.jpg',
      likes: 42,
      comments: 8,
      shares: 3,
      isLiked: false,
      commentsList: [
        { id: 1, author: 'Мария Иванова', text: 'Очень красиво! 😍', time: '1 час назад', avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg' },
        { id: 2, author: 'Дмитрий Смирнов', text: 'Где это снимали?', time: '30 мин назад', avatar: '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg' }
      ]
    },
    {
      id: 2,
      author: 'Мария Иванова',
      avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg',
      time: '4 часа назад',
      content: 'Сегодня отличный день для новых открытий! Изучаю программирование и уже вижу первые результаты 💻✨',
      likes: 28,
      comments: 12,
      shares: 5,
      isLiked: true,
      commentsList: [
        { id: 1, author: 'Алексей Петров', text: 'Молодец! Продолжай в том же духе!', time: '2 часа назад', avatar: '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg' },
        { id: 2, author: 'Анна Козлова', text: 'Какой язык изучаешь?', time: '1 час назад', avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg' }
      ]
    }
  ];

  const [postsState, setPostsState] = useState(initialPosts);

  const stories = [
    { id: 1, name: 'Ваша история', avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg', isOwn: true },
    { id: 2, name: 'Алексей', avatar: '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg' },
    { id: 3, name: 'Мария', avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg' },
    { id: 4, name: 'Дмитрий', avatar: '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg' },
    { id: 5, name: 'Анна', avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg' },
  ];

  const menuItems = [
    { id: 'feed', icon: 'Home', label: 'Новости', count: null },
    { id: 'profile', icon: 'User', label: 'Профиль', count: null },
    { id: 'messages', icon: 'MessageCircle', label: 'Сообщения', count: 5 },
    { id: 'friends', icon: 'Users', label: 'Друзья', count: 12 },
    { id: 'groups', icon: 'Users2', label: 'Группы', count: null },
    { id: 'photos', icon: 'Camera', label: 'Фото', count: null },
    { id: 'music', icon: 'Music', label: 'Музыка', count: null },
    { id: 'admin', icon: 'Shield', label: 'Админ', count: null },
    { id: 'settings', icon: 'Settings', label: 'Настройки', count: null },
  ];

  const handleLike = useCallback((postId: number) => {
    setPostsState(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  }, []);

  const handleShare = useCallback((postId: number) => {
    setPostsState(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, shares: post.shares + 1 }
          : post
      )
    );
  }, []);

  const handleCreatePost = useCallback(() => {
    if (newPostText.trim()) {
      const newPost = {
        id: Date.now(),
        author: userName,
        avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg',
        time: 'только что',
        content: newPostText,
        image: null,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        commentsList: []
      };
      setPostsState(prevPosts => [newPost, ...prevPosts]);
      setNewPostText('');
    }
  }, [newPostText, userName]);

  const handleAddComment = useCallback((postId: number) => {
    const commentText = commentTexts[postId];
    if (commentText?.trim()) {
      const newComment = {
        id: Date.now(),
        author: userName,
        text: commentText,
        time: 'только что',
        avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg'
      };
      
      setPostsState(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                comments: post.comments + 1,
                commentsList: [...(post.commentsList || []), newComment]
              }
            : post
        )
      );
      
      setCommentTexts(prev => ({ ...prev, [postId]: '' }));
    }
  }, [commentTexts, userName]);

  const toggleComments = useCallback((postId: number) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  }, []);

  const handleDeletePost = useCallback((postId: number) => {
    if (isAdmin) {
      setPostsState(prevPosts => prevPosts.filter(post => post.id !== postId));
      setAdminMessage('Пост успешно удален');
      setTimeout(() => setAdminMessage(''), 3000);
    }
  }, [isAdmin]);

  const handleSaveProfile = useCallback(() => {
    setUserName(editUserName);
    setIsEditingProfile(false);
    setAdminMessage('Профиль успешно обновлен');
    setTimeout(() => setAdminMessage(''), 3000);
  }, [editUserName]);

  const handleVerifyUser = useCallback((userId: number) => {
    if (isAdmin) {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, verified: !user.verified }
            : user
        )
      );
      setAdminMessage('Статус верификации изменен');
      setTimeout(() => setAdminMessage(''), 3000);
    }
  }, [isAdmin]);

  const handleBanUser = useCallback((userId: number) => {
    if (isAdmin) {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
            : user
        )
      );
      setAdminMessage('Статус пользователя изменен');
      setTimeout(() => setAdminMessage(''), 3000);
    }
  }, [isAdmin]);

  const handleResolveReport = useCallback((reportId: number) => {
    if (isAdmin) {
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId 
            ? { ...report, status: report.status === 'resolved' ? 'pending' : 'resolved' }
            : report
        )
      );
      setAdminMessage('Статус жалобы изменен');
      setTimeout(() => setAdminMessage(''), 3000);
    }
  }, [isAdmin]);

  const renderAdminContent = () => {
    switch (adminSection) {
      case 'users':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Управление пользователями</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Посты</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Верификация</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.id % 2 === 0 ? '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg' : '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg'} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                      {user.verified && <Icon name="CheckCircle" size={16} className="text-blue-500" />}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.posts}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.verified ? 'default' : 'secondary'}>
                        {user.verified ? 'Верифицирован' : 'Не верифицирован'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerifyUser(user.id)}
                        >
                          {user.verified ? 'Убрать верификацию' : 'Верифицировать'}
                        </Button>
                        <Button
                          size="sm"
                          variant={user.status === 'banned' ? 'default' : 'destructive'}
                          onClick={() => handleBanUser(user.id)}
                        >
                          {user.status === 'banned' ? 'Разблокировать' : 'Заблокировать'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      case 'posts':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Модерация постов</h3>
            <div className="space-y-4">
              {postsState.map((post) => (
                <Card key={post.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{post.author}</span>
                        <span className="text-sm text-slate-500">{post.time}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Icon name="Trash2" size={16} className="mr-1" />
                        Удалить
                      </Button>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                      <span>👍 {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      <span>🔄 {post.shares}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Жалобы и нарушения</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Тип</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Отправитель</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>{report.content}</TableCell>
                    <TableCell>{report.reporter}</TableCell>
                    <TableCell>
                      <Badge variant={report.status === 'resolved' ? 'default' : 'destructive'}>
                        {report.status === 'resolved' ? 'Решено' : 'В ожидании'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolveReport(report.id)}
                      >
                        {report.status === 'resolved' ? 'Переоткрыть' : 'Решить'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Аналитика и отчеты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h4 className="font-medium">Активность пользователей</h4>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Сегодня</span>
                      <span className="font-medium">324 пользователя</span>
                    </div>
                    <div className="flex justify-between">
                      <span>На этой неделе</span>
                      <span className="font-medium">1,247 пользователей</span>
                    </div>
                    <div className="flex justify-between">
                      <span>В этом месяце</span>
                      <span className="font-medium">4,892 пользователя</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h4 className="font-medium">Контент</h4>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Новые посты</span>
                      <span className="font-medium">89 сегодня</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Комментарии</span>
                      <span className="font-medium">256 сегодня</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Лайки</span>
                      <span className="font-medium">1,423 сегодня</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-slate-600">Пользователей</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">3,891</div>
                <div className="text-sm text-slate-600">Постов</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">12,456</div>
                <div className="text-sm text-slate-600">Лайков</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">789</div>
                <div className="text-sm text-slate-600">Сообщений</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Управление контентом</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 justify-start"
                  onClick={() => setAdminSection('users')}
                >
                  <Icon name="Users" className="mr-2" size={20} />
                  <div className="text-left">
                    <div className="font-medium">Управление пользователями</div>
                    <div className="text-sm text-slate-500">Верификация и блокировка</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 justify-start"
                  onClick={() => setAdminSection('posts')}
                >
                  <Icon name="FileText" className="mr-2" size={20} />
                  <div className="text-left">
                    <div className="font-medium">Модерация постов</div>
                    <div className="text-sm text-slate-500">Удаление и контроль</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 justify-start"
                  onClick={() => setAdminSection('reports')}
                >
                  <Icon name="AlertTriangle" className="mr-2" size={20} />
                  <div className="text-left">
                    <div className="font-medium">Жалобы и нарушения</div>
                    <div className="text-sm text-slate-500">Рассмотрение жалоб</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 justify-start"
                  onClick={() => setAdminSection('analytics')}
                >
                  <Icon name="BarChart" className="mr-2" size={20} />
                  <div className="text-left">
                    <div className="font-medium">Аналитика и отчеты</div>
                    <div className="text-sm text-slate-500">Статистика платформы</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'admin':
        return (
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" className="text-red-500" size={24} />
                  <h2 className="text-xl font-semibold">Админ панель</h2>
                </div>
                {adminSection !== 'dashboard' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setAdminSection('dashboard')}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-1" />
                    Назад
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="admin-mode"
                  checked={isAdmin}
                  onCheckedChange={setIsAdmin}
                />
                <Label htmlFor="admin-mode">Включить режим администратора</Label>
              </div>
              
              {adminMessage && (
                <Alert>
                  <Icon name="CheckCircle" size={16} />
                  <AlertDescription>{adminMessage}</AlertDescription>
                </Alert>
              )}
              
              <Separator />
              
              {isAdmin ? renderAdminContent() : (
                <div className="text-center py-8 text-slate-500">
                  Включите режим администратора для доступа к функциям управления
                </div>
              )}

              {isAdmin && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-700">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="font-medium">Режим администратора активен</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    У вас есть расширенные права для управления платформой
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      case 'profile':
        return (
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {isEditingProfile ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                      className="w-48 text-center"
                    />
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Icon name="Check" size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setEditUserName(userName);
                      }}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{userName}</h2>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsEditingProfile(true);
                        setEditUserName(userName);
                      }}
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                  </>
                )}
                {isVerified && (
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                )}
              </div>
              {isVerified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
                  <Icon name="ShieldCheck" size={12} className="mr-1" />
                  Верифицированный аккаунт
                </Badge>
              )}
              
              <div className="mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icon name="Award" size={16} className="mr-2" />
                      Запросить верификацию
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Заявка на верификацию</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                        Верификация подтверждает подлинность вашего аккаунта и дает дополнительные возможности.
                      </p>
                      <div className="space-y-2">
                        <Label>Причина запроса верификации</Label>
                        <Textarea placeholder="Опишите, почему ваш аккаунт должен быть верифицирован..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Документы (необязательно)</Label>
                        <Button variant="outline" className="w-full">
                          <Icon name="Upload" size={16} className="mr-2" />
                          Загрузить документы
                        </Button>
                      </div>
                      <Button 
                        className="w-full social-gradient text-white"
                        onClick={() => {
                          setAdminMessage('Заявка на верификацию отправлена!');
                          setTimeout(() => setAdminMessage(''), 3000);
                        }}
                      >
                        Отправить заявку
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="text-slate-600 mb-4">Добро пожаловать в SocialNet!</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-slate-600">Друзей</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{postsState.filter(p => p.author === userName).length}</div>
                  <div className="text-sm text-slate-600">Постов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">256</div>
                  <div className="text-sm text-slate-600">Фото</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'messages':
        return (
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Сообщения</h2>
              <div className="space-y-4">
                {[
                  { name: 'Алексей Петров', message: 'Привет! Как дела?', time: '10:30', unread: true },
                  { name: 'Мария Иванова', message: 'Увидела твой пост, очень красиво!', time: '09:15', unread: true },
                  { name: 'Дмитрий Смирнов', message: 'Спасибо за поздравления!', time: 'вчера', unread: false },
                ].map((chat, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={index % 2 === 0 ? '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg' : '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg'} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{chat.name}</h3>
                        <span className="text-xs text-slate-500">{chat.time}</span>
                      </div>
                      <p className={`text-sm ${chat.unread ? 'font-medium text-slate-800' : 'text-slate-600'}`}>
                        {chat.message}
                      </p>
                    </div>
                    {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'friends':
        return (
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Друзья</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Алексей Петров', mutual: 15 },
                  { name: 'Мария Иванова', mutual: 8 },
                  { name: 'Дмитрий Смирнов', mutual: 23 },
                  { name: 'Анна Козлова', mutual: 12 },
                  { name: 'Игорь Волков', mutual: 6 },
                  { name: 'Елена Новикова', mutual: 19 },
                ].map((friend, index) => (
                  <div key={index} className="text-center p-4 rounded-lg hover:bg-slate-100">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={index % 2 === 0 ? '/img/b744abf9-6cbf-4760-8752-af94bcfd7930.jpg' : '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg'} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-sm">{friend.name}</h3>
                    <p className="text-xs text-slate-500">{friend.mutual} общих друзей</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <>
            {/* Stories Section */}
            <Card className="mb-6 bg-white/70 backdrop-blur-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-4">
                <h2 className="text-lg font-semibold text-slate-800">Stories</h2>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {stories.map((story) => (
                    <div key={story.id} className="flex-shrink-0 text-center cursor-pointer group">
                      <div className={`relative p-1 rounded-full ${story.isOwn ? 'bg-gradient-to-tr from-slate-300 to-slate-400' : 'story-ring'} hover-scale`}>
                        <Avatar className="h-16 w-16 border-2 border-white">
                          <AvatarImage src={story.avatar} />
                          <AvatarFallback>{story.name[0]}</AvatarFallback>
                        </Avatar>
                        {story.isOwn && (
                          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                            <Icon name="Plus" size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 max-w-[70px] truncate">{story.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card className="mb-6 bg-white/70 backdrop-blur-sm border-slate-200">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg" />
                    <AvatarFallback>Я</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Что у вас нового?" 
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      className="bg-slate-100/50 border-slate-200 focus:bg-white transition-colors resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                          <Icon name="Camera" size={16} className="mr-2" />
                          Фото
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-green-600">
                          <Icon name="Smile" size={16} className="mr-2" />
                          Настроение
                        </Button>
                      </div>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPostText.trim()}
                        className="social-gradient text-white font-medium px-6 disabled:opacity-50"
                      >
                        Опубликовать
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {postsState.map((post) => (
                <Card key={post.id} className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow animate-fade-in">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-slate-800">{post.author}</h3>
                          <p className="text-sm text-slate-500">{post.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isAdmin && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreHorizontal" size={20} />
                        </Button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-slate-700 mb-4 leading-relaxed">{post.content}</p>
                    
                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-auto object-cover hover-scale cursor-pointer"
                        />
                      </div>
                    )}

                    <Separator className="my-4" />

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-6">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-all ${post.isLiked ? 'text-red-500 hover:text-red-600' : 'text-slate-600 hover:text-red-500'}`}
                        >
                          <Icon name="Heart" size={18} fill={post.isLiked ? "currentColor" : "none"} />
                          <span>{post.likes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center space-x-2 text-slate-600 hover:text-blue-500"
                        >
                          <Icon name="MessageCircle" size={18} />
                          <span>{post.comments}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleShare(post.id)}
                          className="flex items-center space-x-2 text-slate-600 hover:text-green-500 transition-all"
                        >
                          <Icon name="Share" size={18} />
                          <span>{post.shares}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-500">
                        <Icon name="Bookmark" size={18} />
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {showComments[post.id] && (
                      <div className="mt-4 space-y-4">
                        <Separator />
                        
                        {/* Existing Comments */}
                        <div className="space-y-3">
                          {(post.commentsList || []).map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-slate-50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">{comment.author}</span>
                                  <span className="text-xs text-slate-500">{comment.time}</span>
                                </div>
                                <p className="text-sm text-slate-700">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Comment */}
                        <div className="flex space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg" />
                            <AvatarFallback>Я</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Input
                              placeholder="Написать комментарий..."
                              value={commentTexts[post.id] || ''}
                              onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              className="bg-slate-100 border-slate-200"
                            />
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentTexts[post.id]?.trim()}
                            className="social-gradient text-white"
                          >
                            <Icon name="Send" size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                SocialNet
              </h1>
              {isAdmin && (
                <Badge variant="destructive" className="bg-red-500">
                  <Icon name="Shield" size={12} className="mr-1" />
                  ADMIN
                </Badge>
              )}
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <Input 
                  placeholder="Поиск друзей, групп, постов..." 
                  className="pl-10 bg-slate-100/50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Icon name="Bell" size={20} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs">3</Badge>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200 sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedSection(item.id);
                        if (item.id === 'admin') setAdminSection('dashboard');
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all hover:bg-slate-100 ${
                        selectedSection === item.id ? 'bg-gradient-to-r from-red-100 to-blue-100 text-blue-600' : 'text-slate-700'
                      } ${item.id === 'admin' ? 'border border-red-200' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.icon} size={20} className={item.id === 'admin' ? 'text-red-500' : ''} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.count && (
                        <Badge variant="secondary" className="bg-red-100 text-red-600">
                          {item.count}
                        </Badge>
                      )}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;