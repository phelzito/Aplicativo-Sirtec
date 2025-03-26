import React, { useState } from 'react';
import { Bell, Newspaper, FileText, Search, ChevronRight, Settings, Plus, Trash2, Eye, ArrowLeft, ExternalLink } from 'lucide-react';

type ContentType = 'comunicados' | 'noticias' | 'documentos' | 'admin';

interface Item {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
  content?: string;
  url?: string;
}

function App() {
  const [activeSection, setActiveSection] = useState<ContentType>('comunicados');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [selectedNews, setSelectedNews] = useState<Item | null>(null);

  const comunicados: Item[] = [
    {
      id: 1,
      title: 'Manutenção Programada',
      date: '15 Mar 2024',
      description: 'Informamos que haverá manutenção programada no sistema no próximo domingo.',
    },
    {
      id: 2,
      title: 'Novo Procedimento',
      date: '14 Mar 2024',
      description: 'Atualização importante sobre os novos procedimentos de segurança.',
    }
  ];

  const noticias: Item[] = [
    {
      id: 1,
      title: 'Expansão das Operações',
      date: '15 Mar 2024',
      description: 'Nossa empresa está expandindo suas operações para novas regiões.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      content: `Nossa empresa está orgulhosa em anunciar uma significativa expansão de nossas operações para novas regiões. Esta expansão marca um momento crucial em nossa trajetória de crescimento e demonstra nosso compromisso contínuo com a inovação e excelência no atendimento aos nossos clientes.

Com investimentos estratégicos em infraestrutura e tecnologia, estamos preparados para atender uma base maior de clientes, mantendo os altos padrões de qualidade que nos tornaram referência no mercado. Esta expansão não apenas fortalece nossa presença no mercado, mas também cria novas oportunidades de emprego e desenvolvimento econômico nas regiões onde atuaremos.

Nossa equipe tem trabalhado incansavelmente nos últimos meses para garantir uma transição suave e eficiente. Implementamos novos sistemas de gestão, expandimos nossa capacidade logística e reforçamos nossa equipe com profissionais altamente qualificados.

Este é apenas o começo de uma nova fase em nossa história. Continuaremos investindo em inovação e buscando formas de melhorar ainda mais nossos serviços, sempre com o objetivo de superar as expectativas de nossos clientes e parceiros.`
    },
    {
      id: 2,
      title: 'Prêmio de Inovação',
      date: '13 Mar 2024',
      description: 'Recebemos o prêmio de empresa mais inovadora do setor.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      content: `É com grande satisfação que anunciamos que nossa empresa foi reconhecida com o prestigioso Prêmio de Inovação do setor. Esta conquista é um testemunho do trabalho árduo e dedicação de toda nossa equipe na busca constante por soluções inovadoras.

O prêmio reconhece nossa contribuição significativa para o avanço tecnológico no setor, destacando especialmente nossas iniciativas em sustentabilidade e transformação digital. Este reconhecimento reforça nossa posição como líderes em inovação e nos motiva a continuar investindo em pesquisa e desenvolvimento.

Agradecemos a todos os nossos colaboradores, parceiros e clientes que tornaram esta conquista possível. Continuaremos nosso compromisso com a excelência e inovação, sempre buscando novas formas de criar valor para nossa comunidade.`
    }
  ];

  const documentos: Item[] = [
    {
      id: 1,
      title: 'Manual do Usuário',
      date: '10 Mar 2024',
      description: 'Manual completo com todas as instruções de uso do sistema.',
      url: 'https://example.com/manual.pdf'
    },
    {
      id: 2,
      title: 'Política de Privacidade',
      date: '08 Mar 2024',
      description: 'Documento oficial sobre nossa política de privacidade e proteção de dados.',
      url: 'https://example.com/privacy.pdf'
    }
  ];

  const getContent = () => {
    switch (activeSection) {
      case 'comunicados':
        return comunicados;
      case 'noticias':
        return noticias;
      case 'documentos':
        return documentos;
      case 'admin':
        return [];
    }
  };

  const filteredContent = getContent().filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAdminContent = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Gerenciar Conteúdo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['comunicados', 'noticias', 'documentos'] as ContentType[]).map((type) => (
            <div key={type} 
                 className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
              <h3 className="font-semibold text-xl mb-3 capitalize">{type}</h3>
              <p className="text-white/90 mb-4">
                Total: {type === 'comunicados' ? comunicados.length : type === 'noticias' ? noticias.length : documentos.length}
              </p>
              <button className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
                <Plus className="h-5 w-5 mr-2" />
                <span>Adicionar {type === 'noticias' ? 'nova' : 'novo'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Atividade Recente</h2>
          <button className="text-primary-500 hover:text-primary-700 flex items-center">
            <Eye className="h-5 w-5 mr-1" />
            Ver tudo
          </button>
        </div>
        <div className="space-y-4">
          {[...comunicados, ...noticias, ...documentos]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
            .map(item => (
              <div key={item.id} 
                   className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <h4 className="font-medium text-lg text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-primary-500 rounded-full hover:bg-primary-50 transition-all duration-200">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-all duration-200"
                    onClick={() => setShowDeleteConfirm(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                {showDeleteConfirm === item.id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-soft">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Confirmar exclusão</h3>
                      <p className="text-gray-600 mb-8">Tem certeza que deseja excluir "{item.title}"?</p>
                      <div className="flex justify-end space-x-4">
                        <button 
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancelar
                        </button>
                        <button 
                          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderNewsDetail = (news: Item) => (
    <div className="space-y-6">
      <button
        onClick={() => setSelectedNews(null)}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors font-medium"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Voltar
      </button>

      <article className="bg-white rounded-2xl shadow-soft overflow-hidden">
        {news.image && (
          <div className="relative w-full h-48 sm:h-64 md:h-96">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>

          <p className="text-sm text-gray-500 mb-8">{news.date}</p>

          <div className="prose prose-lg max-w-none">
            {news.content?.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 sticky top-0 z-10 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Portal de Comunicação
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {activeSection === 'admin' ? 'Painel Administrativo' : `Visualizando ${activeSection}`}
              </p>
            </div>
            <div className="relative group w-full sm:w-64">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'admin' ? (
          renderAdminContent()
        ) : selectedNews ? (
          renderNewsDetail(selectedNews)
        ) : (
          <div className="grid gap-6">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                {item.image && (
                  <div className="relative w-full h-48 sm:h-64 rounded-t-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.date}</p>
                    <p className="mt-3 text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                  {activeSection === 'noticias' && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setSelectedNews(item)}
                        className="flex items-center px-6 py-2 text-primary-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium"
                      >
                        Ler mais
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  )}
                  {activeSection === 'documentos' && item.url && (
                    <div className="mt-6 flex justify-end">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-2 text-primary-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium"
                      >
                        Acesse aqui
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            {[
              { type: 'comunicados', icon: Bell, label: 'Comunicados' },
              { type: 'noticias', icon: Newspaper, label: 'Notícias' },
              { type: 'documentos', icon: FileText, label: 'Documentos' },
              { type: 'admin', icon: Settings, label: 'Admin' }
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => {
                  setActiveSection(type as ContentType);
                  setSelectedNews(null);
                }}
                className={`flex flex-col items-center py-3 px-3 sm:px-4 relative group ${
                  activeSection === type
                    ? 'text-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${
                  activeSection === type ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                <span className="mt-1 text-[10px] sm:text-xs font-medium">{label}</span>
                {activeSection === type && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Bottom Spacing for Fixed Footer */}
      <div className="h-20 sm:h-24"></div>
    </div>
  );
}

export default App;