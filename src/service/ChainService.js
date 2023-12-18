export default class ChainService {
    getRecentBlocks() {
        return fetch('data/recent_blocks.json').then(res => res.json()).then(d => d.data);
    }
}
