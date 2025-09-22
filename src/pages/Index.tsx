import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedSection, setSelectedSection] = useState('feed');
  const [newPostText, setNewPostText] = useState('');

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
      isLiked: false
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
      isLiked: true
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
        author: 'Вы',
        avatar: '/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg',
        time: 'только что',
        content: newPostText,
        image: null,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false
      };
      setPostsState(prevPosts => [newPost, ...prevPosts]);
      setNewPostText('');
    }
  }, [newPostText]);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'profile':
        return (
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/img/24c84469-a371-42dd-98a2-9a3aaaafd967.jpg" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-2">Ваш профиль</h2>
              <p className="text-slate-600 mb-4">Добро пожаловать в SocialNet!</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-slate-600">Друзей</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">48</div>
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
                    <Input 
                      placeholder="Что у вас нового?" 
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      className="bg-slate-100/50 border-slate-200 focus:bg-white transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
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
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={20} />
                      </Button>
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
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-slate-600 hover:text-blue-500">
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
                      onClick={() => setSelectedSection(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all hover:bg-slate-100 ${
                        selectedSection === item.id ? 'bg-gradient-to-r from-red-100 to-blue-100 text-blue-600' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.icon} size={20} />
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