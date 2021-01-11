import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransaction): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error('Saldo insuficiente');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
