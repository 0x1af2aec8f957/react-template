import http, { useHttp } from '../plugins/http';

const [api] = useHttp('/api');

export const fetchTest = () => {
    api.get('/test' /* path: /api/test */, { params: { t: Date.now().valueOf() } }).then((r: any) => {
        console.log(`获取到mock数据：${JSON.stringify(r)}`);
        return r;
    });
}