# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o sseu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha.

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);


**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2hrs;
- O usuário precisar confirmar sua senha ao resetá-la.

# Atualicação do perfil

**RF**

- O usuário deve poder atualizar seu nome, emial e senha.

**RN**

- O usuário não pode alter seu email por um email já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirma a nova senha.

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas.

**RNF**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador deve ser amazenadas no MongoDB;
- As notificações do prestador deve ser enviada em tempo-real utilizando o socket.io

**RN**

- A notificação deve ter um status de lida e não-lida para o controle do prestador.

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve sem armazanda em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8hrs as 18hrs (Primeiro as 8hrs, último as 17hrs);
- O usuário não pode agendar em um horário ja agendado;
- O usuário não pode agendar em um horário que ja passou;
- O usuário não pode agendar um horário consigo mesmo.
