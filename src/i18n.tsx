import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'pt' | 'en';
const translated: Record<string,string> = {
  'Login':'Sign in','Cadastro':'Sign up','Cadastrar':'Create account',
  'Nome':'Name','Seu e-mail':'Your email','Sua senha':'Your password','Senha':'Password',
  'Entrar':'Sign in','Retornar para o login':'Back to sign in',
  'Crie sua conta para saborear muitas delícias e matar sua fome!':'Create your account to explore the catalog and your favorite flavors!',
  'Ou explore o catálogo e o carrinho, sem usar uma conta real:':'Or explore the catalog and cart without a real account:',
  'Acessar demonstração':'Explore demo',
  'A vida é como um sanduíche, é preciso recheá-la com os ':'Life is like a sandwich. Fill it with the ',
  'melhores':'best',' ingredientes.':' ingredients.',
  'Ícone de cesta de compras':'Shopping basket icon','Bolinhas':'Decorative circles',
  'Loja demonstrativa: produtos e preços fictícios. Não há pedidos, pagamentos ou contas reais.':'Demo storefront: fictional products and prices. No real orders, payments or accounts.',
  'Projeto educacional: catálogo e preços ilustrativos. Carrinho salvo na conta; pedidos e pagamentos não estão disponíveis.':'Educational project: illustrative catalog and prices. Account cart; no real orders or payments.',
  'Introdução ao catálogo':'Catalog introduction',
  'Escolha seus favoritos':'Pick your favorites','Explore o cardápio ilustrativo e monte seu carrinho.':'Explore the sample menu and build your cart.',
  ' produtos no catálogo':' products in the catalog',
  'Pesquisar produtos':'Search products','Pesquisar':'Search','Abrir carrinho':'Open cart','Sair':'Sign out',
  'Produtos do catálogo':'Catalog products','Nenhum produto encontrado':'No products found',
  'Tente pesquisar por outro nome.':'Try searching for another product name.',
  'Adicionar':'Add','Sanduíches':'Sandwiches','Acompanhamentos':'Sides','Bebidas':'Drinks',
  'Burger Clássico (demo)':'Classic Burger (demo)','Burger Duplo (demo)':'Double Burger (demo)',
  'Batata Frita (demo)':'French Fries (demo)','Nuggets (demo)':'Nuggets (demo)',
  'Refrigerante (demo)':'Soft Drink (demo)','Suco (demo)':'Juice (demo)',
  'Burger Clássico':'Classic Burger','Burger Duplo':'Double Burger','Batata Frita':'French Fries',
  'Refrigerante':'Soft Drink','Suco':'Juice',
  'Carrinho de compras':'Shopping cart','Fechar':'Close','Sua sacola está vazia':'Your bag is empty',
  'Adicione itens':'Add some items','Remover todos':'Clear cart','itens':'items',
  'unidade':'unit','unidades':'units',' / unidade':' / unit',
  'Quantidade de ':'Quantity of ','Diminuir quantidade de ':'Decrease quantity of ',
  'Aumentar quantidade de ':'Increase quantity of ','Quantidade atual: ':'Current quantity: ',
  'Remover ':'Remove ','Sacola esvaziada':'Cart cleared',
  ' removido da sacola':' removed from cart',' na sacola':' in cart',
  'Erro ao carregar os produtos.':'Could not load products.',
  'Faça login novamente.':'Please sign in again.',
  'Não foi possível salvar o carrinho. Atualize a página e tente novamente.':'Could not save the cart. Refresh and try again.',
  'Limite de 99 unidades por produto.':'Limit of 99 units per product.',
  'Atualize a página para sincronizar o carrinho.':'Refresh to sync the cart.',
  'Não foi possível esvaziar o carrinho. Atualize a página.':'Could not clear cart. Refresh the page.',
  'Não foi possível recuperar sua sessão.':'Could not restore your session.',
  'Conta criada com sucesso. Faça login.':'Account created. Please sign in.',
  'Cadastro recebido. Confirme seu email para ativar a conta.':'Signup received. Confirm your email to activate the account.',
  'Não foi possível cadastrar.':'Could not create the account.',
  'Resposta inválida':'Invalid response','Login feito com sucesso!':'Signed in successfully!',
  'Não foi possível fazer login.':'Could not sign in.'
};
const Context=createContext<{lang:Language;setLang:(l:Language)=>void;t:(s:string)=>string}|null>(null);
function firstLanguage():Language{
  const query=new URLSearchParams(location.search).get('lang');
  if(query==='pt'||query==='en')return query;
  try{const saved=localStorage.getItem('burger_language');if(saved==='pt'||saved==='en')return saved;}catch{}
  return 'pt';
}
export function LanguageProvider({children}:{children:ReactNode}){
  const[lang,setLang]=useState<Language>(firstLanguage);
  useEffect(()=>{
    document.documentElement.lang=lang==='pt'?'pt-BR':'en';
    const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(history.state,'',url);
    try{localStorage.setItem('burger_language',lang);}catch{}
  },[lang]);
  const t=(s:string)=>lang==='en'?(translated[s]??s):s;
  return <Context.Provider value={{lang,setLang,t}}>{children}</Context.Provider>;
}
export function useLanguage(){
  const value=useContext(Context);if(!value)throw new Error('LanguageProvider missing');return value;
}
export function LanguageSwitcher(){
  const{lang,setLang}=useLanguage();
  return <div className='burger-language-switch' role='group' aria-label={lang==='pt'?'Idioma':'Language'}>
    {(['pt','en'] as const).map(code=><button key={code} type='button' onClick={()=>setLang(code)}
      aria-pressed={lang===code} lang={code==='pt'?'pt-BR':'en'}
      aria-label={code==='pt'?'Português':'English'}>{code.toUpperCase()}</button>)}
  </div>;
}
