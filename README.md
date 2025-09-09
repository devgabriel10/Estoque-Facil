# Estoque-Facil
Projeto de aplicativo para controle de estoque de bebidas do restaurante Saveur.

------------------------------------------------------------------------------------------

• Qual o problema identificado na qual a aplicação propõe solucionar?
	- A não disponibilidade de diversos produtos para os clientes.
Restaurantes trabalham com um modelo de negócio que é a oferta prévia de seus produtos (cardápio). Este modelo tem por objetivo gerar: Expectativa → Entrega.

 
• Como este problema pode afetar o Saveur?
	- Desvalorização progressiva da marca.
O público-alvo do restaurante espera uma experiência completa. Quando não entregue, a marca do restaurante para o cliente é desvalorizada → A desvalorização está inversamente proporcional ao crescimento do negócio.

------------------------------------------------------------------------------------------------------------------------

• Atualmente, como o restaurante tenta solucionar este problema?
	- Contagem de estoque partir da saída dos produtos / Período: Semanalmente.
	- Atualização de uma planilha em Excel / Uma nova planilha para cada semana.
A partir de dados de saída dos produtos, novos pedidos são feitos.

• Quais falhas o método atual apresenta?
	- Fluxo (entrada e saída).
Não existe uma atualização de bebidas que entram; somente as que saem.
	- Dispersão de dados (informações).
Não existe um lugar único e específico que controla o estoque de bebidas do restaurante.
 	

------------------------------------------------------------------------------------------------------------------------


• Como, afinal, a aplicação irá funcionar para solucionar o problema?
	- O usuário terá acesso a um painel que mostra todas as bebidas que o restaurante trabalha.
Este painel é dividido em subáreas (refrigerantes, sucos, águas, vinhos, cervejas, etc.)
Para cada bebida, o usuário irá definir uma quantidade mínima de disponibilidade em estoque daquele produto.
Conforme sua disponibilidade, o produto será etiquetado entre 3 possíveis status:
1- Ok (etiqueta verde)
2- Fazer pedido (etiqueta amarela)
3- Esgotado (etiqueta vermelha)
	- O ideal seria trabalhar em 2 níveis de controle, porém, a lógica de trabalhar em 3 níveis de controle está ligada a possíveis eventos que estão fora do controle do restaurante (problemas com fornecedor, falta de dinheiro em caixa para novos pedidos, etc). Portanto, explica-se:
O primeiro nível é autoexplicativo.
O segundo nível será classificado para as bebidas que estão se aproximando do esgotamento, mas que, conforme a quantidade, ainda oferta a possibilidade de vendas.
O terceiro nível impede a venda do produto, para que não haja a remota possibilidade de uma promessa de venda do produto, e uma resposta negativa ao cliente após isso. Exemplo prático: Uma mesa com 12 pessoas pede uma garrafa de vinho. O garçom oferta 1 das 5 garrafas disponíveis. A mesa não pretende mudar a harmonização do vinho. Outro vinho é ofertado e, concomitantemente, o mesmo vinho é vendido em outras 3 mesas. A mesa com 12 pessoas terá de escolher outro vinho, prejudicando uma experiência de 12 clientes.
	- Toda a lógica de quantificação é definida totalmente pelo usuário, de acordo com o fluxo de oferta e pedidos que são feitos (semanalmente, diariamente, quinzenalmente).

• Como o usuário deve utilizar a aplicação?
	- Cadastro de todas as bebidas disponíveis no restaurante
	- No cadastro, quantifica-se os produtos
	- Para atualizar a quantidade de produtos, o usuário irá atualizá-lo na chegada de novos pedidos (adicionando) e removê-lo conforme a venda de cada produtos.
Observação: O sistema TOTVS Food já faz o trabalho de imprimir o registro de todas as vendas de bebidas. Em tempo real, ou ao fim do expediente, o trabalho será somente atualizar cada produto, removendo a quantidade que foi vendida.

------------------------------------------------------------------------------------------------------------------------

• Funcionalidade Bônus:
	- Aba especial que recomenda vinhos para um determinado prato, baseado na escolha de clientes.
Quando o cliente perguntar qual vinho mais tem saído para aquele pedido, o garçom terá a resposta.
Observação: Funcionalidade baseado 100% na experiência do cliente, e não do Sommelier. Funcionalidade totalmente opcional.
	- Exemplo prático: O restaurante acomoda diversos apreciadores casuais de vinho. O cardápio da casa não é vasto; possui pratos bem selecionados / O sistema TOTVS Food oferece uma visão completa de todos os pedidos feitos por uma mesa → Pode-se inferir quais tem sido os vinhos preferidos para cada prato.
