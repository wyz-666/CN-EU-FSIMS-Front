export default class FloatLabelDemoChainService {
    getFoodChain() {
        return fetch('data/food_chain.json').then(res => res.json()).then(d => d.data);
    }
}
