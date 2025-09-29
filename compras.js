// compras.js - Função unificada para salvar pedidos com dados do usuário

/**
 * Salva um pedido/compra no Firebase
 * @param {Array} carrinho - Lista de produtos
 * @param {Object} endereco - Endereço de entrega
 * @param {String} formaPagamento - Forma de pagamento (pix, cartao)
 * @param {Object} dadosPagamento - Dados específicos do pagamento
 */
async function salvarPedidoNoFirebase(carrinho, endereco, formaPagamento = 'pix', dadosPagamento = {}) {
    try {
        console.log('💾 Salvando pedido no Firebase...');

        // Verificar usuário logado
        const user = firebase.auth().currentUser;
        if (!user) {
            throw new Error("Usuário não está logado!");
        }

        // Verificar carrinho
        if (!carrinho || carrinho.length === 0) {
            throw new Error("Carrinho vazio!");
        }

        // Calcular total da compra
        const subtotal = carrinho.reduce((acc, item) => {
            const preco = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            return acc + (preco * item.quantity);
        }, 0);

        const frete = 15.00; // Frete fixo
        const total = subtotal + frete;

        // Criar objeto do pedido
        const pedido = {
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName || 'Cliente',
            numeroPedido: 'VG' + Date.now(),
            data: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'pago',
            formaPagamento: formaPagamento,
            dadosPagamento: dadosPagamento,
            itens: carrinho,
            subtotal: subtotal,
            frete: frete,
            total: total,
            endereco: endereco || {
                rua: 'Endereço não informado',
                cidade: 'Cidade não informada',
                estado: 'Estado não informado',
                cep: '00000-000'
            }
        };

        console.log('📦 Pedido a ser salvo:', pedido);

        // Salvar no Firestore
        const docRef = await firebase.firestore()
            .collection('pedidos')
            .add(pedido);

        console.log('✅ Pedido salvo com sucesso! ID:', docRef.id);
        return docRef.id;

    } catch (error) {
        console.error('❌ Erro ao salvar pedido:', error);
        throw error;
    }
}