import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';

const VerifyCollectionStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[];
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'VerifyCollectionInstructionArgs',
);
export type VerifyCollectionInstructionAccounts = {
  metadata: web3.PublicKey;
  collectionAuthority: web3.PublicKey;
  payer: web3.PublicKey;
  collectionMint: web3.PublicKey;
  collection: web3.PublicKey;
  collectionMasterEditionAccount: web3.PublicKey;
};

const verifyCollectionInstructionDiscriminator = [56, 113, 101, 253, 79, 55, 122, 169];

/**
 * Creates a _VerifyCollection_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 */
export function createVerifyCollectionInstruction(accounts: VerifyCollectionInstructionAccounts) {
  const {
    metadata,
    collectionAuthority,
    payer,
    collectionMint,
    collection,
    collectionMasterEditionAccount,
  } = accounts;

  const [data] = VerifyCollectionStruct.serialize({
    instructionDiscriminator: verifyCollectionInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: collectionAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: collectionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: collection,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: collectionMasterEditionAccount,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
    keys,
    data,
  });
  return ix;
}
