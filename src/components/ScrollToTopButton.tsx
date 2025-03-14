interface ScrollToTopButtonProps {
    showScrollButton: boolean;
  }
  
  const ScrollToTopButton = ({ showScrollButton }: ScrollToTopButtonProps) => {
    
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <>
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="btn btn-primary position-fixed bottom-0 end-0 m-4"
            style={{
              backgroundColor: '#063dab',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          >
            ↑
          </button>
        )}
      </>
    );
  };
  
  export default ScrollToTopButton;
  