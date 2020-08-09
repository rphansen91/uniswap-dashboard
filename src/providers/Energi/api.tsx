import moment from 'moment'

const nodeApi = "https://nodeapi.energi.network/";
const WEI = 1e18

interface IMasternode {
  AnnouncedBlock: number;
  Collateral: string;
  Enode: string;
  IsActive: boolean;
  IsAlive: boolean;
  Masternode: string;
  Owner: string;
  SWFeatures: string;
  SWVersion: string;
}

export const getBalances = async (owners: string | string[]) => Promise.all(([] as string[]).concat(owners).map(getBalance)).then(merge)
export const getBalance = (owner: string) => {
  return fetch(`//explorer.energi.network/api?module=account&action=balance&address=${owner}`)
  .then(r => r.json())
  .then(r => Number(r.result) / WEI)
  .then(balance => ({ [owner]: { balance } }))
}

export const listMasternodes = () => {
  return rpc<IMasternode[]>(nodeApi, "masternode_listMasternodes");
}

export async function estimateBlocksTilNextMasternodeRewards(
  owners: string | string[]
) {
  const { result } = await listMasternodes();
  return merge(([] as string[]).concat(owners).map((owner) => ({ [owner]: estimateBlocksTil(result, owner) })))
}
  
export async function estimateBlocksTilNextMasternodeReward(
  owner: string
) {
  const { result } = await listMasternodes();
  return estimateBlocksTil(result, owner);
}

function estimateBlocksTil (result: IMasternode[], owner: string) {
  const masternode = result.find(({ Owner }) => Owner === owner);
  if (!masternode) return { isActive: false, isAlive: false }
  const rank = result.findIndex(({ Owner }) => Owner === owner);
  const precedingResults = result.slice(0, rank);
  const precedingAmounts = precedingResults.map(
    ({ Collateral }) => (parseInt(Collateral) / WEI)
  );
  console.log(precedingAmounts)
  const precedingCollateral = precedingAmounts.reduce((acc, c) => acc + c, 0);
  const blocks = Math.floor(precedingCollateral / 10000);
  const estimatedTime = moment().add(blocks, 'minutes');
  return { rank, blocks, isActive: masternode.IsActive, isAlive: masternode?.IsAlive, estimatedTime }
}

async function rpc<V>(
  url = "",
  method = "",
  params: string[] = [],
  id = 15
): Promise<{
  id: number;
  jsonrpc: string;
  result: V;
}> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 15, method, params }),
  }).then((v) => v.json());
}

function merge<V>(arr: V[]): V {
  return Object.assign({}, ...arr)
}

export function mapValues(values: any, fn: (v: any, k: string) => any) {
  return Object.keys(values).reduce((acc, k) => {
    acc[k] = fn(values[k], k)
    return acc
  }, {} as any)
} 