export interface ServerRespond {
  // Define the structure of the server response here

  stock: string;
  timestamp: string;
  top_bid: { price: number, size: number };
  top_ask: { price: number, size: number };
}

export class DataStreamer {
  static getData(callback: (data: ServerRespond[]) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/query', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        callback(JSON.parse(request.responseText));
      }
    };
    request.onerror = () => {
      console.error('Network error');
    };
    request.send();
  }
}
